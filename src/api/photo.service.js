import { getCollectionByName } from "../utils/firebase";
import { getUser } from "../utils/Auth";

const uid = getUser().uid;
// const imgData = getCollectionByName(uid);


export function uploadImgData(imageName, url) {
    const imgData = getCollectionByName(uid);
    return imgData.doc(imageName).set({
        name: imageName,
        url: url,
    })
}

export function getImgData() {
    const imgData = getCollectionByName(uid);
    var data = [];
    return (
        imgData.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push({
                    ...doc.data(),
                });
            });
            return data;
        })
    )
};