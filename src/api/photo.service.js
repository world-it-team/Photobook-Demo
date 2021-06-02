import { getCollectionByName } from "../utils/firebase";
import { getUser, isLoggedIn } from "../utils/Auth";


const uid = getUser().uid;
// const imgData = getCollectionByName(uid);


export function saveChoosedImage(image) {
    return  getCollectionByName("image").add({
        uid: uid,
        key: image.alt,
      });
}

export function getChoosedImage() {
    const data = [];

    return (

           getCollectionByName("image").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push({
                        ...doc.data(),
                    });
                });
                return data;
            })
    )
};

