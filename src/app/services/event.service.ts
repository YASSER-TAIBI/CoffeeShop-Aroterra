import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {Event} from "../models/event";

const PATH = 'event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);

  private http = inject(HttpClient);

  private franceUrl = 'https://www.googleapis.com/calendar/v3/calendars/en.french.official%23holiday%40group.v.calendar.google.com/events?key=AIzaSyAmRJ-Ylu_Ksot9wsmTcbHBQx_0ykCJDyo';
  private marocUrl = 'https://www.googleapis.com/calendar/v3/calendars/en.ma.official%23holiday%40group.v.calendar.google.com/events?key=AIzaSyAmRJ-Ylu_Ksot9wsmTcbHBQx_0ykCJDyo';

  getHolidays(url: string) {
    return this.http.get<any>(url);
  }

  getTodayHolidays() {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    // Récupération des jours fériés pour la France et le Maroc
    return Promise.all([
      this.getHolidays(this.franceUrl).toPromise(),
      this.getHolidays(this.marocUrl).toPromise(),
    ]).then(([franceHolidays, marocHolidays]) => {
      const franceToday = franceHolidays.items.filter((event: any) => event.start.date === today);
      const marocToday = marocHolidays.items.filter((event: any) => event.start.date === today);
      return {
        france: franceToday,
        maroc: marocToday,
      };
    });
  }

  getEvent() {
    return collectionData(this._collection, {idField:'id'}) as Observable<Event[]>;
  }

  addEvent(event: Event) {
    return addDoc(this._collection, event);
  }

  deleteEvent(id: string) {
    const eventDocRef = doc(this._firestore, `${PATH}/${id}`);
    return deleteDoc(eventDocRef);
  }

}
