import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserProfile} from "../../models/userProfile";
import {AsyncPipe, NgClass, NgFor, NgOptimizedImage} from "@angular/common";
import {UserProfileService} from "../../services/user-profile.service";
import {Subscription} from "rxjs";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AsyncPipe,
    NgFor,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../assets/css/admin-styles.css']
})

export class ProfileComponent implements OnInit {
  isButtonVisible: boolean = false;
  isEditable: boolean = false;

  storage: Storage = inject(Storage);
  authService = inject(AuthService);
  userProfileService = inject(UserProfileService);

  profile$ = this.userProfileService.getUserProfile();
  userEmail: string | undefined;
  private userSubscription: Subscription | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  file: File | null = null;
  fileUrl: string | null = null;


  profileForm = new FormGroup({
    userImage: new FormControl(''),
    telephone: new FormControl(''),
    adresse: new FormControl(''),
    postal_adresse: new FormControl(0),
    region_adresse: new FormControl(''),
    ville_adresse: new FormControl(''),
    pays_adresse: new FormControl('')
  });

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUserSig.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        console.log("Email de l'utilisateur :", this.userEmail);
        this.loadUserProfile(this.userEmail);
      } else {
        console.log("Utilisateur non authentifié");
      }
    });
  }

  private loadUserProfile(email: string): void {
    this.userProfileService.getUserProfileEmail(email).then(userProfile => {
      if (userProfile) {

        this.imageSrc = userProfile.userImage;
        // Set form values with user profile data
        this.profileForm.patchValue({

          telephone: userProfile.telephone,
          adresse: userProfile.adresse,
          postal_adresse: userProfile.postal_adresse,
          region_adresse: userProfile.region_adresse,
          ville_adresse: userProfile.ville_adresse,
          pays_adresse: userProfile.pays_adresse
        });
      } else {
        console.log("Profil utilisateur non trouvé");
      }
    }).catch(error => {
      console.error("Erreur lors de la récupération du profil utilisateur :", error);
    });
  }

  onSelectPhoto(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          // Ajuste la taille du canvas
          canvas.width = MAX_WIDTH;
          canvas.height = MAX_HEIGHT;
          ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);

          // Convertit l'image redimensionnée en base64
          const resizedImage = canvas.toDataURL('image/jpeg');

          // Mise à jour de l'aperçu de l'image
          this.imageSrc = resizedImage;

          // Conversion de base64 en fichier Blob pour l’upload
          this.file = this.base64ToBlob(resizedImage, 'image/jpeg');
        };
      };

      reader.readAsDataURL(this.file);
    }
  }

// Convertit base64 en Blob
  base64ToBlob(base64: string, contentType: string): File {
    const byteString = atob(base64.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new File([arrayBuffer], this.file?.name || 'image.jpg', { type: contentType });
  }

  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `articles/${file.name}`;
      console.log('Uploading file to:', filePath);
      const fileRef = ref(this.storage, filePath);
      const uploadFile = uploadBytesResumable(fileRef, file);

      uploadFile.on('state_changed', (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Progression du chargement :', progress);
        },
        (error) => {
          console.error('Erreur lors du téléchargement du fichier :', error);
        },
        async () => {
          console.log("Le fichier a été téléchargé avec succès !");
          const url = await getDownloadURL(fileRef);
          this.fileUrl = url; // Assignez l'URL à la propriété publique
          console.log("URL du fichier: ", this.fileUrl);
          resolve(this.fileUrl); // Résoudre la promesse avec l'URL
        }
      );
    });
  }

  get firstName(): string {
    return this.authService.getCurrentUser()?.username.split(' ')[0] || '';
  }

  get lastName(): string {
    return this.authService.getCurrentUser()?.username.split(' ')[1] || '';
  }

  edit() {
    this.isButtonVisible = !this.isButtonVisible;
    this.isEditable = !this.isEditable;
  }

  async onSave() {
    if (this.profileForm.value.telephone == '' || this.profileForm.value.adresse == '' || this.profileForm.value.postal_adresse == 0 || this.profileForm.value.region_adresse == '' || this.profileForm.value.ville_adresse == '' || this.profileForm.value.pays_adresse == '') {
      alert('Remplir tous les champs de saisie !');
      return;
    }
    if (window.confirm('Voulez-vous vraiment modifier vos informations!')) {

      if (this.file) {
        const url = await this.uploadFile(this.file); // Attendre que le fichier soit téléchargé et obtenir l'URL
        console.log("url", url);
        this.profileForm.patchValue({ userImage: url });
      }else {
        const email = this.authService.getCurrentUser()?.email;
        if (email){
          const getUser = await  this.userProfileService.getUserProfileEmail(email);
          this.profileForm.patchValue({ userImage: getUser?.userImage });
      }
    }
        const userProfile: UserProfile = {
          civilite: this.authService.getCurrentUser()?.civilite || '',
          prenom: this.firstName || '',
          nom: this.lastName || '',
          telephone: this.profileForm.value.telephone || '',
          adresse: this.profileForm.value.adresse || '',
          postal_adresse: +this.profileForm.value.postal_adresse!,
          region_adresse: this.profileForm.value.region_adresse || '',
          ville_adresse: this.profileForm.value.ville_adresse || '',
          pays_adresse: this.profileForm.value.pays_adresse || '',
          userImage: this.profileForm.value.userImage  || '',
          email: this.authService.getCurrentUser()?.email || '',
          userRole: this.authService.getCurrentUser()?.userRole || '',
          badges: this.authService.getCurrentUser()?.badges || ''
        };

        console.log("userProfile", userProfile);
        try {
          await this.userProfileService.updateProfile(userProfile);
          this.edit();
          alert('Profil mis à jour avec succès!');
        } catch (error) {
          console.error(error);
          alert('Erreur lors de la mise à jour du profil.');
        }
    }
  }


  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
