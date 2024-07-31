import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
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
    return collectionData(this._collection) as Observable<Reservation[]>;
  }

  addReservation(reservation: Reservation) {
    return addDoc(this._collection, reservation);
  }
}
