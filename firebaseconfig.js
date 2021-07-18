import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";



const config = {
    apiKey: "AIzaSyDQRDrjB6px4IbCSId0HslhQPYto7HJeMk",
    authDomain: "dailyacts-b2dc3.firebaseapp.com",
    projectId: "dailyacts",
    storageBucket: "dailyacts.appspot.com",
    messagingSenderId: "993340618705",
    appId: "1:993340618705:web:23d93725926ee12b34d2f0",
    measurementId: "G-PP98FD21JL"

  }


const firebase = !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase;
  
const  {FieldValue}  = Firebase.firestore;

const {TimeStamp} = Firebase.firestore

const auth = Firebase.auth()

const functions = Firebase.functions()


export { firebase, FieldValue, auth, TimeStamp };