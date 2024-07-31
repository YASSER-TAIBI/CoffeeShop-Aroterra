import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserProfile} from "../../models/userProfile";
import {AsyncPipe, NgFor, NgOptimizedImage} from "@angular/common";
import {UserProfileService} from "../../services/user-profile.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../assets/css/admin-styles.css']
})
export class ProfileComponent implements OnInit {
  isButtonVisible: boolean = false;
  isEditable: boolean = false;

  authService = inject(AuthService);

  userProfileService = inject(UserProfileService);
  profile$ = this.userProfileService.getUserProfile();
  userEmail: string | undefined;
  private userSubscription: Subscription | null = null;


  profileForm = new FormGroup({
  telephone :new FormControl(''),
  adresse :new FormControl(''),
  postal_adresse :new FormControl(0),
  region_adresse :new FormControl(''),
  ville_adresse :new FormControl(''),
  pays_adresse :new FormControl('')
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

  get firstName(): string {
    return this.authService.getCurrentUser()?.username.split(' ')[0] || '';
  }

  get lastName(): string {
    return this.authService.getCurrentUser()?.username.split(' ')[1] || '';
  }

  edit(){
    this.isButtonVisible = !this.isButtonVisible;
    this.isEditable =  !this.isEditable;
  }

  async onSave(){
    if (this.profileForm.value.telephone == '' || this.profileForm.value.adresse == '' || this.profileForm.value.postal_adresse == 0 || this.profileForm.value.region_adresse == '' || this.profileForm.value.ville_adresse == '' ||this.profileForm.value.pays_adresse == ''){
            alert('Remplir tous les champs de saisie !');
            return;
        }
    if (window.confirm('Voulez-vous vraiment modifier vos informations!')) {

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
        userImage: this.authService.getCurrentUser()?.userImage || '',
        email: this.authService.getCurrentUser()?.email || '',
        userRole: this.authService.getCurrentUser()?.userRole || ''
      };

      console.log("userProfile", userProfile);
      try {
    await this.userProfileService.updateProfile(userProfile);
      this.edit();
      alert('Profil mis à jour avec succès!');
      } catch(error) {
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
