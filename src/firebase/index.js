import { initializeApp } from 'firebase/app';

import { getMessaging, getToken } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';

const vapidKey =
  'BPuFnp8Fq8cmRbIkm8h0Aye1H6Au6w1kw1H5CJTHwTvJ-KguoEWY3kYb7sdnq0Juh7QoZDEpioKfVqeHUyCrcn0';

const firebaseConfig = {
  apiKey: 'AIzaSyDkX29rpHTe48T3hgQAtcEdfkeh3i71SRg',
  authDomain: 'ob-firebase-f434e.firebaseapp.com',
  projectId: 'ob-firebase-f434e',
  storageBucket: 'ob-firebase-f434e.appspot.com',
  messagingSenderId: '444765866703',
  appId: '1:444765866703:web:827f8fd9cbf41cde9705ba',
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging();

getToken(messaging, { vapidKey: vapidKey })
  .then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);

      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
      sendTokenToServer(currentToken);
    } else {
      console.log(
        'No registration token available. Request permission to generate one.'
      );

      // shows on the UI that permission is required
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });

const sendTokenToServer = (token) => {
  if (localStorage.getItem('tokenSentToServer')) return;
  // Implementar la logica de que en el servidor se almacene el token
  localStorage.setItem('tokenSentToServer', '1');
};

export const db = getFirestore();
