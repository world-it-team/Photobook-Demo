import { getUser, setUser } from "../utils/Auth";
import User from "../models/User";

import getFirebase, { getCollectionByName } from "../utils/firebase";

const firebase = getFirebase();
const userInfoCollection = getCollectionByName("userInfo");
// const courseCollection = getCollectionByName("courses");

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

// Save data after login
// export function handlerAfterLoggedIn() {
//     const user = fromFirebase();

//     // Save userData to cache
//     setUser(user);

//     courseCollection
//         .get()
//         .then((querySnapshot) => {
//             const allCourses = [];

//             querySnapshot.forEach((doc) => {
//                 allCourses.push({
//                     ...doc.data(),
//                     id: doc.id
//                 });
//             });

//             user.allCourses = allCourses;
//             // Update courses to user
//             setUser(user);
//         })
// }

// export function addOrUpdateUserInfo(userInfo) {
//     var user = fromFirebase();

//     user.displayName = userInfo.displayName || "";

//     return userInfoCollection
//         .doc(user.uid)
//         .set(Object.assign({}, user));
// }

export function fromFirebase() {
    const user = new User();

    user.uid = firebase.auth().currentUser.uid;
    user.displayName = firebase.auth().currentUser.displayName || "";
    user.photoURL = firebase.auth().currentUser.photoURL || "";
    user.email = firebase.auth().currentUser.email || "";

    return user;
}