const { getFirestore, collection,docu } = require ("firebase/firestore")
require("firebase/firestore");
const { initializeApp } = require("firebase/app")

const firebaseConfig = {
    apiKey: "AIzaSyAufJPL2pDMi4wQCU8zrVUVOmtLDnbBTE4",
    authDomain: "github-favorite-list.firebaseapp.com",
    projectId: "github-favorite-list",
    storageBucket: "github-favorite-list.appspot.com",
    messagingSenderId: "243789585996",
    appId: "1:243789585996:web:1bdbc94631a81f1e3d5ee9",
    measurementId: "G-EP5MPLWFZ4"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const currentCode = collection(db, "code")
const infoUser = collection(db,"phone")
const favList = collection(db,"list")

module.exports = {currentCode,infoUser,favList}