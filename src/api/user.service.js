import { getUser, setUser } from "../utils/Auth";
import User from "../models/User";

import getFirebase, { getCollectionByName } from "../utils/firebase";
import { Email } from "@material-ui/icons";

const firebase = getFirebase();
const userInfoCollection = getCollectionByName("users");
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

    return user;
}

export function createUserDoc(user, addDisplayName){
    if(!user) return;
    const userRef = firebase.firestore().doc(`users/${user.uid}`)

    const snapshot = userRef.get()

    if(!snapshot.exists){
        const  email = user.email;
        const {displayName} = addDisplayName;
        try{
            userRef.set({
                displayName,
                email,
                createAt: new Date(),
            });
        }
        catch(error){
            console.log("Error in creating user", error )
        }
    }
}