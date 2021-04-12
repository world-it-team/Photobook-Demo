import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCfAzoHAn6MfeUDMETzn8IYQT3HR4KdEhI",
    authDomain: "photobook-demo-22c7c.firebaseapp.com",
    projectId: "photobook-demo-22c7c",
    storageBucket: "photobook-demo-22c7c.appspot.com",
    messagingSenderId: "236133303296",
    appId: "1:236133303296:web:9e50a9ba0f59ac6cd284e5"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default function getFirebase() {
    if (typeof window !== 'undefined') {
        return firebase;
    }

    return null;
}

export function getStorage() {
    if (typeof window !== 'undefined') {
        return firebase.storage();
    }

    return null;
}

export function getCollectionByName(name) {
    if (typeof window !== 'undefined') {
        return firebase.firestore().collection(name);
    }

    return {};
}