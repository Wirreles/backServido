require("dotenv").config();
const { initializeApp, applicationDefault, credential } = require("firebase-admin/app");
const admin = require("firebase-admin")
const { getFirestore } = require("firebase-admin/firestore");
const googleCredentials = require('../pencuentro.json');  

 
initializeApp({
  credential: admin.credential.cert(googleCredentials),
});

const db = getFirestore();

module.exports = {
  db,
};
