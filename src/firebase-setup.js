const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getStorage } = require('firebase-admin/storage');
const STORAGE_BUCKET = `${process.env.GOOGLE_PROJECT_ID}.appspot.com`;

const firebaseApp = initializeApp({
    credential: applicationDefault(),
    storageBucket: STORAGE_BUCKET
});

const storage = getStorage(firebaseApp);

module.exports = {
    storage
}