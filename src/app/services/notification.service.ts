import {inject, Injectable} from '@angular/core';
import {Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Notification } from '../models/notification';
import { Observable } from 'rxjs';

const PATH = 'notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);


  getNotification(){
    return collectionData(this._collection, {idField:'id'}) as Observable<Notification[]>;
  }

  addNotification(notification: Notification) {
    return addDoc(this._collection, notification);
  }

  updateNotification(notification: Notification): Promise<void> {
    const notifDocRef = doc(this._firestore, `${PATH}/${notification.id}`);
    return updateDoc(notifDocRef, { isRead: notification.isRead });
  }

  deleteNotification(id: string) {
    const notifDocRef = doc(this._firestore, `${PATH}/${id}`);
    return deleteDoc(notifDocRef);
  }
}
