import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserProfile} from "../models/userProfile";
import {Firestore, collection, addDoc, collectionData, query, where, getDocs} from '@angular/fire/firestore';
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

  getUserProfileEmail(email: string): Promise<UserProfile | null> {
    const q = query(this._collection, where('email', '==', email));
    return getDocs(q).then(querySnapshot => {
      if (querySnapshot.empty) {
        return null;
      } else {
        return querySnapshot.docs[0].data() as UserProfile;
      }
    });
  }
}
