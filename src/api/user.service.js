import { getUser, setUser } from "../utils/Auth";
import User from "../models/User";

import getFirebase, { getCollectionByName } from "../utils/firebase";

const firebase = getFirebase();
const userInfoCollection = getCollectionByName("userInfo");

export function loadingUserInfo() {
    var docRef = userInfoCollection.doc(getUser().uid);

    return docRef.get().then((doc) => {
        if (doc.exists) {
            const userInfo = doc.data();
            setUser(userInfo);

            return userInfo;
        } else {
            return getUser();
        }
    });
}

export function fromFirebase() {
    const user = new User();

    user.uid = firebase.auth().currentUser.uid;
    user.displayName = firebase.auth().currentUser.displayName || "";
    user.photoURL = firebase.auth().currentUser.photoURL || "";
    user.email = firebase.auth().currentUser.email || "";
    user.password = firebase.auth().currentUser.password || "";

    return user;
}