import firebase from 'firebase';
import 'firebase/firestore';

const config = require('./config/firebase');
const firebaseApp = firebase.initializeApp(config);
const firestore = firebaseApp.firestore();

firestore.settings({ timestampsInSnapshots: true });

export default firestore;
