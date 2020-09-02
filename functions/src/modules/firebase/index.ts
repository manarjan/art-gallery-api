import * as functions from "firebase-functions";
import admin = require("firebase-admin");

export const firebaseApp: admin.app.App = admin.initializeApp(
  functions.config().firebase
);

export const firestoreDB: FirebaseFirestore.Firestore = firebaseApp.firestore();
