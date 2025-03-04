import {inject, Injectable} from '@angular/core';
import {Board, Card, CardType, List, Priorite} from '../models/board';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  collectionData,
  updateDoc,
  arrayUnion, getDoc, deleteDoc
} from '@angular/fire/firestore';
import {Observable} from "rxjs";

const PATH = 'board';
const PATH_LISTS = 'lists';
const PATH_CARDS = 'cards';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private _firestore= inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  getBoards(): Observable<Board[]> {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Board[]>;
  }

  // Ajouter un board avec une liste vide
  async addBoard(title: string) {
    const boardRef = doc(this._collection); // ID auto-généré
    const boardId = boardRef.id; // Récupération de l'ID Firestore généré

    // Définition des 5 listes
    const listTitles = ['À faire', 'En Cours', 'Révision', 'Test', 'Terminé🎉'];
    const lists: List[] = listTitles.map(title => {
      const listRef = doc(collection(this._firestore, `${PATH}/${boardId}/${PATH_LISTS}`)); // Génération d'un ID similaire à Firestore
      return {
        id: listRef.id, // ID de la liste généré par Firestore
        IdBoard: boardId,
        title: title,
        cards: []
      };
    });

    // Création du board avec les 5 listes
    const board: Board = {
      id: boardRef.id,
      title: title,
      lists: lists
    };

    await setDoc(boardRef, board);
    return board.id; // Retourne l'ID du board créé
  }

  // Ajouter une liste et mettre à jour le board
  async addList(boardId: string, title: string) {
    const boardRef = doc(this._firestore, `${PATH}/${boardId}`);
    const listsCollection = collection(this._firestore, `${PATH}/${boardId}/${PATH_LISTS}`);

    // Création d'une nouvelle liste
    const listRef = doc(listsCollection);
    const list: List = {
      id: listRef.id,
      title: title,
      IdBoard: boardId,
      cards: []
    };

    // Mettre à jour le tableau des listes dans le board
    await updateDoc(boardRef, {
      lists: arrayUnion(list)
    });

    return list.id; // Retourne l'ID de la liste ajoutée
  }

  // Ajouter une carte avec position automatique
  async addCard(boardId: string, listId: string, cardTitle: string, cardCounter: number, cardDescription: string, cardType: CardType, priorite: Priorite) {
    try {
      // Récupérer le document du board
      const boardRef = doc(this._firestore, PATH, boardId);
      const boardSnap = await getDoc(boardRef);

      if (!boardSnap.exists()) {
        console.error(` Le board avec l'ID ${boardId} n'existe pas.`);
        return;
      }

      // Forcer le typage en `Board`
      const boardData = boardSnap.data() as Board;

      if (!boardData.lists) {
        console.error(` Le board ${boardId} ne contient pas de listes.`);
        return;
      }

      // Vérifier si la liste existe
      const listIndex = boardData.lists.findIndex((list) => list.id === listId);
      if (listIndex === -1) {
        console.error(` La liste avec l'ID ${listId} n'existe pas dans le board ${boardId}.`);
        return;
      }

      // Ajouter la nouvelle carte à la liste trouvée
      const newCardRef = doc(collection(this._firestore, `${PATH}/${boardId}/${PATH_LISTS}/${listId}/${PATH_CARDS}`)); // Firebase génère un ID
      const newCard: Card = {
        id: newCardRef.id, // Génère un ID unique pour la carte
        title: cardTitle,
        counter: cardCounter,
        description: cardDescription,
        type: cardType,
        priorite: priorite,
        IdList: listId
      };

      boardData.lists[listIndex].cards = boardData.lists[listIndex].cards || [];
      boardData.lists[listIndex].cards.push(newCard);

      // Mettre à jour Firestore avec la liste modifiée
      await updateDoc(boardRef, { lists: boardData.lists });

      console.log('Carte ajoutée avec succès !');
    } catch (error) {
      console.error(' Erreur lors de l\'ajout de la carte :', error);
    }
  }

  // Deplacer une carte vers une nouvelle list
  async moveCard(cardId: string, fromListId: string, toListId: string, boardId: string) {
    const boardRef = doc(this._firestore, `${PATH}/${boardId}`);
    const boardSnap = await getDoc(boardRef);

    if (!boardSnap.exists()) {
      console.error("Le board n'existe pas !");
      return;
    }

    const boardData = boardSnap.data() as Board;
    let lists = boardData?.lists || [];

    // Trouver la liste source et la liste cible
    const fromList = lists.find((list: any) => list.id === fromListId);
    const toList = lists.find((list: any) => list.id === toListId);

    if (!fromList || !toList) {
      console.error("Listes introuvables !");
      return;
    }

    // Trouver et retirer la carte de la liste source
    const cardToMove = fromList.cards.find((card: any) => card.id === cardId);
    if (!cardToMove) {
      console.error("Carte introuvable !");
      return;
    }
    fromList.cards = fromList.cards.filter((card: any) => card.id !== cardId);

    // Ajouter la carte à la liste cible
    toList.cards.push({ ...cardToMove, IdList: toListId });

    // Mettre à jour Firestore
    await updateDoc(boardRef, { lists });
  }

  async deleteBoard(boardId: string | undefined) {
    if (!boardId) return;
    const boardRef = doc(this._firestore, `${PATH}/${boardId}`);
    // Supprimer enfin le board
    await deleteDoc(boardRef);
  }

  async deleteList(boardId: string, listId: string) {
    if (!boardId || !listId) return;

    try {
      const boardRef = doc(this._firestore, 'board', boardId);
      const boardSnap = await getDoc(boardRef);

      if (!boardSnap.exists()) {
        console.error("Le board n'existe pas.");
        return;
      }

      const boardData = boardSnap.data() as Board;
      const updatedLists = boardData.lists.filter((list: any) => list.id !== listId);

      await updateDoc(boardRef, { lists: updatedLists });

      console.log(`Liste ${listId} supprimée du board ${boardId} avec succès !`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste :", error);
    }
  }

  async deleteCard(boardId: string, listId: string, cardId: string) {
    if (!boardId || !listId || !cardId) return;

    try {
      const boardRef = doc(this._firestore, 'board', boardId);
      const boardSnap = await getDoc(boardRef);

      if (!boardSnap.exists()) {
        console.error("Le board n'existe pas.");
        return;
      }

      const boardData = boardSnap.data() as Board;

      // Trouver la liste correspondante
      const updatedLists = boardData.lists.map((list: any) => {
        if (list.id === listId) {
          // Filtrer les cartes pour supprimer celle avec cardId
          list.cards = list.cards.filter((card: any) => card.id !== cardId);
        }
        return list;
      });

      // Mettre à jour le document Firestore
      await updateDoc(boardRef, { lists: updatedLists });

      console.log(`Carte ${cardId} supprimée de la liste ${listId} dans le board ${boardId} !`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte :", error);
    }
  }

  async updateCard(boardId: string, listId: string, cardId: string, title: string, description: string, type: string, priorite: string) {
      if (!boardId || !listId || !cardId || !title || !description || !type || !priorite) return;

      try {
        const boardRef = doc(this._firestore, `${PATH}/${boardId}`);
        const boardSnap = await getDoc(boardRef);

        if (!boardSnap.exists()) {
          console.error("Le board n'existe pas.");
          return;
        }
        const boardData = boardSnap.data() as Board;

        // Mettre à jour la carte spécifique dans la liste
        const updatedLists = boardData.lists.map((list: any) => {
          if (list.id === listId) {
            list.cards = list.cards.map((card: any) => {
              if (card.id === cardId) {
                return { ...card, title, description, type, priorite }; // Mise à jour des champs
              }
              return card;
            });
          }
          return list;
        });

        // Mettre à jour Firestore
        await updateDoc(boardRef, { lists: updatedLists });

      } catch (error) {
        console.error("Erreur lors de la mise à jour de la carte :", error);
      }
    }
 }
