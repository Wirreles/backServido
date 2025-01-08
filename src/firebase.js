require("dotenv").config();
const { initializeApp, applicationDefault, credential } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// const googleCredentials = require('../pencuentro.json'); 

 
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

module.exports = {
  db,
};
