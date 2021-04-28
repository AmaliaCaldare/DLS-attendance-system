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

export default {
  setup
};
