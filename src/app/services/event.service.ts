import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private get apiUrl(): string {
    const currentYear = new Date().getFullYear();
    return `https://calendrier.api.gouv.fr/jours-feries/metropole/${currentYear}.json`;

  }

   constructor(private http: HttpClient) {}

  // Méthode pour récupérer les jours fériés dynamiquement selon l'année
  getPublicHolidays(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(this.apiUrl);
  }

}
