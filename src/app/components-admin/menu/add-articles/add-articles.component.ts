import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {Menu, MenuEtat, MenuTypeArticle} from "../../../models/menu";
import {Storage, ref, uploadBytesResumable, getDownloadURL} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-add-articles',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.css',  '../../../../assets/css/admin-styles.css']
})
export class AddArticlesComponent {
  menuService = inject(MenuService);

  private storage: Storage = inject(Storage);

  menuEtat = MenuEtat;
  menuTypeArticle = MenuTypeArticle;
  imageSrc: string | ArrayBuffer | null = null;
  file: File | null = null;
  fileUrl: string | null = null;

  formData = {
    typeArticle: '',
    article: '',
    imageUrl: '',
    description: '',
    price: 0,
    etat: '',
  };

  get menuEtats(): string[] {
    return Object.values(this.menuEtat);
  }
  get menuTypeArticles(): string[] {
    return Object.values(this.menuTypeArticle);
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
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
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

  private getMenuTypeArticleEnum(value: string): MenuTypeArticle | undefined {
    return Object.values(MenuTypeArticle).find(item => item === value);
  }

  private getMenuEtatEnum(value: string): MenuEtat | undefined {
    return Object.values(MenuEtat).find(item => item === value);
  }
  async onSubmit() {

      if (this.formData.typeArticle === '' ||this.formData.article === '' || this.formData.description === '' || this.formData.etat === '' || this.formData.price === 0 || !this.file ) {
        alert('Remplir tous les champs de saisie !');
        return;
      }

      if (window.confirm("Voulez-vous vraiment ajouter cet article ?")) {

        try {
          const url = await this.uploadFile(this.file); // Attendre que le fichier soit téléchargé et obtenir l'URL


          const typeArticleEnum = this.getMenuTypeArticleEnum(this.formData.typeArticle);
          const etatEnum = this.getMenuEtatEnum(this.formData.etat);

        const menu: Menu = {
          typeArticle: typeArticleEnum!,
          article: this.formData.article || '',
          imageUrl: url,
          description: this.formData.description || '',
          price: this.formData.price || 0,
          etat: etatEnum!,

        };
        console.log('Form Submitted', menu);
          await  this.menuService.addMenu(menu).then(() => {
            this.resetForm();
            alert('Profil mis à jour avec succès!');
          }).catch(error => {
            console.error(error);
            alert('Erreur lors de la mise à jour du profil.');
          });
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'article :", error);
        }
  }

}

  resetForm(){
    this.formData = {
      typeArticle: '',
      article: '',
      imageUrl: '',
      description: '',
      price: 0,
      etat: ''
    }
    this.imageSrc = null;
  }
}
