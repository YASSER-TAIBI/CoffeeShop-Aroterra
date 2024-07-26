import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserProfile} from "../models/userProfile";
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  afs =inject(AngularFirestore);

  constructor(private firestore: Firestore ) {}

  addUserProfile(userProfile: UserProfile) {
    const userProfileCollection = collection(this.firestore, 'profile');
    return addDoc(userProfileCollection, userProfile);
  }
}
