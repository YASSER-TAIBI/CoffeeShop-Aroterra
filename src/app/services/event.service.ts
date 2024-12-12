import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {ColorEvent, Event, TypeEvent} from "../models/event";
import { firstValueFrom } from 'rxjs';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {HolidayTranslations} from "../shared/translations/holiday-translations";

const PATH = 'events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _firestore=inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  private http = inject(HttpClient);

  private franceUrl = 'https://www.googleapis.com/calendar/v3/calendars/en.french.official%23holiday%40group.v.calendar.google.com/events?key=AIzaSyAmRJ-Ylu_Ksot9wsmTcbHBQx_0ykCJDyo';
  private marocUrl = 'https://www.googleapis.com/calendar/v3/calendars/en.ma.official%23holiday%40group.v.calendar.google.com/events?key=AIzaSyAmRJ-Ylu_Ksot9wsmTcbHBQx_0ykCJDyo';

  // Méthode pour récupérer les événements
  getHolidays(url: string): Observable<Event[]> {
    return new Observable<Event[]>((observer) => {
      this.http.get<any>(url).subscribe(response => {
        // Transformer les événements Google Calendar en un tableau de notre interface Event
        const events: Event[] = response.items.map((item: any)  => this.mapToEvent(item));
        observer.next(events);
        observer.complete();
      });
    });
  }

  // Mapper les données de l'API Google Calendar vers l'interface Event
  private mapToEvent(item: any): Event {
    let actionHolidays: string;
    let holidays: TypeEvent;
    let colorHolidays: ColorEvent;

    if (item.creator.displayName === "Holidays in France") {
      actionHolidays = 'FR - '+this.translateEvent(item.summary);
      holidays = TypeEvent.vacances_fr;
      colorHolidays = ColorEvent.bleu;
    }else {
      actionHolidays = 'MA - '+this.translateEvent(item.summary);
      holidays = TypeEvent.vacances_ma;
      colorHolidays = ColorEvent.vert;
    }
    return {
      action: actionHolidays,
      dateDebut: this.convertToNgbDateStruct(item.start.date),
      dateFin: this.convertToNgbDateStruct(item.end.date),
      typeEvent: holidays,
      colorEvent: colorHolidays,
    };
  }

  // Convertir une date en format NgbDateStruct
  private convertToNgbDateStruct(date: string): NgbDateStruct | null {
    if (!date) return null;
    const [year, month, day] = date.split('-').map(Number);
    return { year, month, day };
  }

  async getTodayEvent(): Promise<{ france: Event[]; maroc: Event[]; event: Event[] }> {
    const today = new Date().toISOString().split('T')[0];
    try {
      // Récupérer les événements des jours fériés pour la France et le Maroc
      const [franceHolidays = [], marocHolidays = [], eventCustomer = []] = await Promise.all([
        firstValueFrom(this.getHolidays(this.franceUrl)),
        firstValueFrom(this.getHolidays(this.marocUrl)),
        firstValueFrom(this.getEvents()),
      ]);
      const eventToday = eventCustomer.filter(event =>
        this.isDateWithinRange(today, event.dateDebut, event.dateFin)
      );
      const franceToday = franceHolidays.filter(event =>
        this.isDateWithinRange(today, event.dateDebut, event.dateFin)
      );
      const marocToday = marocHolidays.filter(event =>
        this.isDateWithinRange(today, event.dateDebut, event.dateFin)
      );
      console.log("franceToday",franceToday);
      console.log("marocToday",marocToday);
      console.log("eventToday",eventToday);

      return {
        france: franceToday,
        maroc: marocToday,
        event: eventToday,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des jours fériés :', error);
      throw error;
    }
  }

// Vérifie si une date est dans un intervalle (entre dateDebut et dateFin)
  private isDateWithinRange(today: string, dateDebut: string | NgbDateStruct | null, dateFin: string | NgbDateStruct | null): boolean {
    const todayDate = new Date(today);
    const startDate = typeof dateDebut === 'string' ? new Date(dateDebut) : this.parseNgbDateStruct(dateDebut);
    const endDate = typeof dateFin === 'string' ? new Date(dateFin) : this.parseNgbDateStruct(dateFin);

    if (!startDate || !endDate) {
      return false;
    }
    return todayDate >= startDate && todayDate <= endDate;
  }

// Convertit NgbDateStruct en objet Date
  private parseNgbDateStruct(dateStruct: NgbDateStruct | null): Date | null {
    if (!dateStruct || !dateStruct.year || !dateStruct.month || !dateStruct.day) {
      console.error('Invalid NgbDateStruct:', dateStruct);
      return null;
    }
    return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
  }

  translateEvent(summary: string): string {
    // Récupérer la traduction ou retourner l'original si non trouvé
    return HolidayTranslations[summary];
  }

  getEvents() {
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
