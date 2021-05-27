import { getCollectionByName } from "../utils/firebase";
import { getUser } from "../utils/Auth";


const uid = getUser().uid;
// const imgData = getCollectionByName(uid);


export function saveChoosedImage(image) {
    return  getCollectionByName("image").doc().set({
        uid: uid,
        key: image.alt,
      });
}

export function getChoosedImage() {
    const data = [];
    return (
      
        getCollectionByName("image").where("uid", "==", uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push({
                    ...doc.data(),
                });
            });
            return data;
        })
    )
};

