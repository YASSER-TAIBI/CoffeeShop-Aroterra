import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserProfile} from "../../models/userProfile";
import {UserConnect} from "../../models/userConnect";
import {NgOptimizedImage} from "@angular/common";
import {UserProfileService} from "../../services/user-profile.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../assets/css/admin-styles.css']
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
   userProfileService = inject(UserProfileService);

  profileForm = new FormGroup({
  telephone :new FormControl(''),
  adresse :new FormControl(''),
  postal_adresse :new FormControl(''),
  region_adresse :new FormControl(''),
  ville_adresse :new FormControl(''),
  pays_adresse :new FormControl('')
  });

  ngOnInit(): void {
  }
  get firstName(): string {
    return this.authService.currentUserSig()?.username.split(' ')[0] || '';
  }

  get lastName(): string {
    return this.authService.currentUserSig()?.username.split(' ')[1] || '';
  }

  // onSave(): void {
  //
  //   if (this.profileForm.value.telephone == '' || this.profileForm.value.adresse == '' || this.profileForm.value.postal_adresse == '' || this.profileForm.value.region_adresse == '' || this.profileForm.value.ville_adresse == '' ||this.profileForm.value.pays_adresse == ''){
  //       alert('Remplir tous les champs de saisie !');
  //       return;
  //   }
  //   if(window.confirm('vous voulez vraiment modifier vos informations!')){
  //     console.log(this.profileForm.value.civilite);
  //     console.log(this.profileForm.value.prenom);
  //   }
  //
  //    }

  onSave(): void {
    if (this.profileForm.invalid) {
      alert('Remplir tous les champs de saisie !');
      return;
    }

    if (window.confirm('Vous voulez vraiment modifier vos informations!')) {
      const userProfile: UserProfile = {
        civilite: this.authService.currentUserSig()?.civilite || '',
        prenom: this.firstName || '',
        nom: this.lastName || '',
        telephone: this.profileForm.value.telephone || '',
        adresse: this.profileForm.value.adresse || '',
        postal_adresse: +this.profileForm.value.postal_adresse!,
        region_adresse: this.profileForm.value.region_adresse || '',
        ville_adresse: this.profileForm.value.ville_adresse || '',
        pays_adresse: this.profileForm.value.pays_adresse || '',
        userImage: this.authService.currentUserSig()?.userImage || '',
        email: this.authService.currentUserSig()?.email || '',
        userRole: this.authService.currentUserSig()?.userRole || ''
      };


      console.log("userProfile", userProfile);

       this.userProfileService.addUserProfile(userProfile).then(() => {
        alert('Profil mis à jour avec succès!');
      }).catch(error => {
        console.error(error);
        alert('Erreur lors de la mise à jour du profil.');
      });
    }
  }
}
