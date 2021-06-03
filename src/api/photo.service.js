import { getCollectionByName } from "../utils/firebase";
import { getUser, isLoggedIn } from "../utils/Auth";


// const uid = getUser().uid;
// const imgData = getCollectionByName(uid);


export function saveChoosedImage(image,uid) {
    return  getCollectionByName("image").add({
        uid: uid,
        key: image.alt,
        id: image.id
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

export function deleteChoosedImage(id){

   
}