import admin from 'firebase-admin';

import serviceAccount from '../../../serviceAccountKey.json';

let db;

// initialize admin SDK using serciceAcountKey
const setup = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  db = admin.firestore();
};

function signUpWithEmailPassword(email, password) {
  admin.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

function signInWithEmailPassword(email, password) {
  admin.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  // [END auth_signin_password]
}
export default {
  setup
};
