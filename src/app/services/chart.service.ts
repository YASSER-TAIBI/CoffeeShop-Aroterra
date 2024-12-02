import {inject, Injectable} from '@angular/core';
import {collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";

const PATH = 'chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);


  // Configuration pour le Doughnut
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

  // Configuration pour le Bar Chart
  getBarChartConfig(): any {
    return {
      type: 'bar',
      data: {
        labels: [], // Les mois (ex: Janvier, Février, etc.)
        datasets: [
          {
            label: 'Valider',
            data: [], // Réservations validées par mois
            backgroundColor: '#1cc88a',
          },
          {
            label: 'En Cours',
            data: [], // Réservations en cours par mois
            backgroundColor: '#da9f5b',
          },
          {
            label: 'Non Valider',
            data: [], // Réservations non validées par mois
            backgroundColor: '#e74a3b',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Nombre de Réservations',
            },
          },
        },
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

  // Charger les données des réservations pour chaque mois de l'année en cours
  async loadMonthlyReservationsData(): Promise<{
    labels: string[];
    valider: number[];
    enCours: number[];
    nonValider: number[]
  }> {
    const currentYear = new Date().getFullYear();
    const reservationCollection = collection(this._firestore, 'reservation');
    const q = query(reservationCollection, where('date.year', '==', currentYear));

    const querySnapshot = await getDocs(q);

    // Initialisation des données par mois
    const monthlyData = {
      valider: Array(12).fill(0),
      enCours: Array(12).fill(0),
      nonValider: Array(12).fill(0),
    };

    // Parcourir les documents pour calculer les totaux par mois et par type
    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;
      const month = data.date?.month - 1; // Les mois sont indexés à partir de 0

      if (data.etat === 'Valider') {
        monthlyData.valider[month]++;
      } else if (data.etat === 'En Cours') {
        monthlyData.enCours[month]++;
      } else if (data.etat === 'Non Valider') {
        monthlyData.nonValider[month]++;
      }
    });

    return {
      labels: this.getMonthLabels(),
      valider: monthlyData.valider,
      enCours: monthlyData.enCours,
      nonValider: monthlyData.nonValider,
    };
  }

  // Générer les étiquettes pour les mois
  getMonthLabels(): string[] {
    return [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];
  }
}
