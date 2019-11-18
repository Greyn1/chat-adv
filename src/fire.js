import firebase from 'firebase';

const Config = {
    apiKey: "AIzaSyAADSGSgfZjGvTNcN6vYytaGYImexiHmBM",
    authDomain: "authentication-ef14d.firebaseapp.com",
    databaseURL: "https://authentication-ef14d.firebaseio.com",
    projectId: "authentication-ef14d",
    storageBucket: "authentication-ef14d.appspot.com",
    messagingSenderId: "39534116459",
    appId: "1:39534116459:web:4696048b8791e60d"
};

var fire = firebase.initializeApp(Config);
export default fire;