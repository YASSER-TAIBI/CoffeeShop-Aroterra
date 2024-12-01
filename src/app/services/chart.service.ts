import {inject, Injectable} from '@angular/core';
import {collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";

const PATH = 'chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);


  // Configuration initiale pour le graphique
  getChartConfig(): any {
    return {
      type: 'doughnut',
      data: {
        labels: ['Valider', 'En Cours', 'Non Valider'],
        datasets: [{
          data: [0, 0, 0], // Données initiales
          backgroundColor: ['#1cc88a', '#da9f5b', '#e74a3b'],
          hoverOffset: 4,
        }],
      },
      options: {
        aspectRatio: 1,
      },
    };
  }


// Charger les données des réservations pour l'année en cours
  async loadReservationsData(): Promise<{ valider: number; enCours: number; nonValider: number }> {
    const currentYear = new Date().getFullYear();
    const reservationCollection = collection(this._firestore, 'reservation');
    const q = query(reservationCollection, where('date.year', '==', currentYear));

    const querySnapshot = await getDocs(q);

    const reservationsCount = { valider: 0, enCours: 0, nonValider: 0 };

    // Compter les réservations par état
    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;
      if (data.etat === 'Valider') {
        reservationsCount.valider++;
      } else if (data.etat === 'En Cours') {
        reservationsCount.enCours++;
      } else if (data.etat === 'Non Valider') {
        reservationsCount.nonValider++;
      }
    });

    return reservationsCount;
  }
}
