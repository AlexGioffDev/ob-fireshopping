importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js'
);

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: 'AIzaSyDkX29rpHTe48T3hgQAtcEdfkeh3i71SRg',
  authDomain: 'ob-firebase-f434e.firebaseapp.com',
  projectId: 'ob-firebase-f434e',
  storageBucket: 'ob-firebase-f434e.appspot.com',
  messagingSenderId: '444765866703',
  appId: '1:444765866703:web:827f8fd9cbf41cde9705ba',
});

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
