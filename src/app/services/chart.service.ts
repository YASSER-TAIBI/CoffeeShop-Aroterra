import {inject, Injectable} from '@angular/core';
import {collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";

const PATH = 'chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);

  private readonly listNames = ["À faire", "En Cours", "Révision", "Test", "Terminé🎉"];


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

  // Configuration pour le Horizontal Bar Chart
  getHorizontalBarChartConfig(): any {
    return {
      type: 'bar',
      data: {
        labels: [], // Les noms des listes (ex: "À faire", "En Cours", etc.)
        datasets: [
          {
            label: 'Nombre de cartes',
            data: [], // Nombre de cartes par liste
            backgroundColor: ['#1cc88a', '#da9f5b', '#e74a3b', '#36b9cc', '#f6c23e'],
          }
        ],
      },
      options: {
        indexAxis: 'y', // Afficher les listes sur l'axe Y
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Nombre de Cartes',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Listes',
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

    // Filtrer par année en comparant les 4 premiers caractères de 'date' (YYYY-MM-DD)
    const q = query(reservationCollection, where('date', '>=', `${currentYear}-01-01`), where('date', '<=', `${currentYear}-12-31`));

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

    // Filtrer les réservations de l'année en cours avec la date au format 'YYYY-MM-DD'
    const q = query(reservationCollection, where('date', '>=', `${currentYear}-01-01`), where('date', '<=', `${currentYear}-12-31`));


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

      if (data.date) {
        const monthIndex = parseInt(data.date.split('-')[1], 10) - 1; // Extraire le mois et convertir en index (0-11)

        if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
          if (data.etat === 'Valider') {
            monthlyData.valider[monthIndex]++;
          } else if (data.etat === 'En Cours') {
            monthlyData.enCours[monthIndex]++;
          } else if (data.etat === 'Non Valider') {
            monthlyData.nonValider[monthIndex]++;
          }
        }
      }
    });

    return {
      labels: this.getMonthLabels(),
      valider: monthlyData.valider,
      enCours: monthlyData.enCours,
      nonValider: monthlyData.nonValider,
    };
  }

  private async loadBoardCardsData(boardTitle: string): Promise<{ labels: string[], cardCounts: number[], totalCards: number }> {
    const boardCollection = collection(this._firestore, 'board');
    const querySnapshot = await getDocs(boardCollection);

    const cardCounts = Array(this.listNames.length).fill(0);
    let totalCards = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;

      if (data.title === boardTitle && data.lists && Array.isArray(data.lists)) {
        data.lists.forEach((list: any) => {
          const listIndex = this.listNames.indexOf(list.title);
          if (listIndex !== -1 && list.cards) {
            cardCounts[listIndex] = list.cards.length;
            totalCards += list.cards.length;
          }
        });
      }
    });

    return { labels: this.listNames, cardCounts, totalCards };
  }

  async loadBoardCardsAdminData(): Promise<{ labels: string[], cardCounts: number[], totalCards: number }> {
    return this.loadBoardCardsData("ARÔTERRA - Administration");
  }

  async loadBoardCardsClientData(): Promise<{ labels: string[], cardCounts: number[], totalCards: number }> {
    return this.loadBoardCardsData("ARÔTERRA - Client");
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
