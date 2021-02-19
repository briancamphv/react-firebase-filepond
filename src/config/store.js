import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDAB7xpdUb6APaLmgwD8A_Ny37vA2bSZaQ",
  authDomain: "crwn-db-743d6.firebaseapp.com",
  databaseURL: "https://crwn-db-743d6-default-rtdb.firebaseio.com",
  projectId: "crwn-db-743d6",
  storageBucket: "crwn-db-743d6.appspot.com",
  messagingSenderId: "81613914964",
  appId: "1:81613914964:web:f44b3d3f6a7422ca57fec1",
  measurementId: "G-80BLW3QK8X"
};

const MyStore = firebase.initializeApp(config);

export default MyStore;