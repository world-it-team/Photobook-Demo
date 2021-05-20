import { getUser, setUser } from "../utils/Auth";
import User from "../models/User";

import getFirebase, { getCollectionByName } from "../utils/firebase";

const firebase = getFirebase();
const userInfoCollection = getCollectionByName("users");
export function loadingUserInfo() {
    var docRef = userInfoCollection.doc(getUser().uid);
    return docRef.get().then((doc) => {
        if (doc.exists) {
            const userInfo = doc.data();
            userInfo.uid = getUser().uid;
            userInfo.emailVerified = getUser().emailVerified;
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
    user.popup = firebase.auth().currentUser.popup || true ;
    user.emailVerified = firebase.auth().currentUser.emailVerified;
    console.log(firebase.auth().currentUser)
    return user;
}

export function handleVerifyEmail(actionCode) {
    console.log(actionCode);
    firebase.auth().applyActionCode(actionCode).then((resp) => {
        console.log(resp)
    });
}

export function getUserLogin(){
    const user = fromFirebase()
    setUser(user)
    createUserDoc(user, user.displayName)
}

export function addOrUpdateUserInfo(userInfo) {
    console.log(userInfo)
    var user = fromFirebase()
    user.uid = userInfo.uid;
    user.displayName = userInfo.displayName ;
    user.photoURL = userInfo.photoURL || "";
    user.email = userInfo.email ;
    user.popup = userInfo.popup ;
    user.emailVerified = userInfo.emailVerified
  
    return userInfoCollection.doc(user.uid).set(Object.assign({}, user))
  }
export function createUserDoc(user, addDisplayName){
    if(!user) return;
    const userRef = firebase.firestore().doc(`users/${user.uid}`)
    userRef.get().then((doc) => {
        if (!doc.exists) {
            const  email = user.email;
            const displayName = addDisplayName;
            const popup = true;
            const emailVerified = false;
            try{
                userRef.set({
                    displayName,
                    email,
                    popup,
                    emailVerified,
                    createAt: new Date(),
                });
            }
            catch(error){
                console.log("Error in creating user", error )
            }
        }
    });
    // const snapshot = userRef.get()
    // console.log(snapshot)
    // if(!snapshot.exists){
    //     console.log("a")
    //     const  email = user.email;
    //     const displayName = addDisplayName;
    //     const popup = true
    //     try{
    //         userRef.set({
    //             displayName,
    //             email,
    //             popup,
    //             createAt: new Date(),
    //         });
    //     }
    //     catch(error){
    //         console.log("Error in creating user", error )
    //     }
    // }
}