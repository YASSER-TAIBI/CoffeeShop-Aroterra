importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBeWq5wSAO_mCcJNqEuAG72P68w7uxL68k",
  authDomain: "coffeeshop-aroterra.firebaseapp.com",
  projectId: "coffeeshop-aroterra",
  storageBucket: "coffeeshop-aroterra.appspot.com",
  messagingSenderId: "301393911820",
  appId: "1:301393911820:web:c35475531a07a8a7bc8e29",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
