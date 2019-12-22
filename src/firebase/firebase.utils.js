import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDTaQPKtXvKoHa5FnX4_-QLy5y1R4_bXyc",
    authDomain: "e-commerce-311c3.firebaseapp.com",
    databaseURL: "https://e-commerce-311c3.firebaseio.com",
    projectId: "e-commerce-311c3",
    storageBucket: "",
    messagingSenderId: "123150235575",
    appId: "1:123150235575:web:1d8b71439c0645fb4d5a32"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const collectionRef = firestore.collection('users');
    const snapShot = await userRef.get();
    const collectionSnapshot = await collectionRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
  };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'} );
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;