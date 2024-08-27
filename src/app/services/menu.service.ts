import {inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Menu} from "../models/menu";

const PATH = 'menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);


  getMenu() {
    return collectionData(this._collection, {idField:'id'}) as Observable<Menu[]>;
  }

  addMenu(menu: Menu) {
    return addDoc(this._collection, menu);
  }

  // Méthode pour mettre à jour un Menu existante
  updateMenu(id: string, menu: Partial<Menu>) {
    const menuDocRef = doc(this._firestore, `${PATH}/${id}`);
    return updateDoc(menuDocRef, menu);
  }

  // Méthode pour supprimer un Menu par ID
  deleteReservation(id: string) {
    const menuDocRef = doc(this._firestore, `${PATH}/${id}`);
    return deleteDoc(menuDocRef);
  }
}
