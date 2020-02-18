import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCMIEhXlCOq6WWEfU_95cOuNyuac2bzBaY",
    authDomain: "supplyanddemend.firebaseapp.com",
    databaseURL: "https://supplyanddemend.firebaseio.com",
    projectId: "supplyanddemend",
    storageBucket: "supplyanddemend.appspot.com",
    messagingSenderId: "1026500994003",
    appId: "1:1026500994003:web:7c135674169278a5f7c526",
    measurementId: "G-QM660NQZ6V"
};

firebase.initializeApp(firebaseConfig);

/**
 * Get the current logged in user email
 * or an empty string if no user is logged or it has no email
 */
export function getCurrentUserId() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser && currentUser.email) {
        return currentUser.email;
    }
    return '';
}

export default firebase;