import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserProfile} from "../models/userProfile";
import {Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
import {Observable} from "rxjs";

const PATH = 'profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);


  getUserProfile() {
    return collectionData(this._collection) as Observable<UserProfile[]>;
  }

  addUserProfile(userProfile: UserProfile) {
    return addDoc(this._collection, userProfile);
  }
}
