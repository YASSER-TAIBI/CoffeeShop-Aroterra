import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc,
  Firestore, query,
  updateDoc, where,
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Reservation} from "../models/reservation";

const PATH = 'reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);


  getReservation() {
    return collectionData(this._collection, {idField:'id'}) as Observable<Reservation[]>;
  }

  addReservation(reservation: Reservation) {
    return addDoc(this._collection, reservation);
  }

  // Méthode pour mettre à jour une réservation existante
  updateReservation(id: string, reservation: Partial<Reservation>) {
    const reservationDocRef = doc(this._firestore, `${PATH}/${id}`);
    return updateDoc(reservationDocRef, reservation);
  }

  // Méthode pour supprimer une réservation par ID
  deleteReservation(id: string) {
    const reservationDocRef = doc(this._firestore, `${PATH}/${id}`);
    return deleteDoc(reservationDocRef);
  }

  // Récupérer uniquement les réservations validées
  getValidatedReservations(): Observable<Reservation[]> {
    const validatedQuery = query(this._collection, where('etat', '==', 'Valider'));
    return collectionData(validatedQuery, { idField: 'id' }) as Observable<Reservation[]>;
  }
}
