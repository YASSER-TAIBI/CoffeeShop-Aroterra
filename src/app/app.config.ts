import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage} from "@angular/fire/storage";

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyBeWq5wSAO_mCcJNqEuAG72P68w7uxL68k",
  authDomain: "coffeeshop-aroterra.firebaseapp.com",
  projectId: "coffeeshop-aroterra",
  storageBucket: "coffeeshop-aroterra.appspot.com",
  messagingSenderId: "301393911820",
  appId: "1:301393911820:web:c35475531a07a8a7bc8e29"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      provideStorage(() => getStorage())
    )
  ]
};
