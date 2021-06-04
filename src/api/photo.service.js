import { getCollectionByName } from "../utils/firebase";
import { getUser } from "../utils/Auth";
import ChoosedImage from "../models/ChoosedImage";

import firebase from "firebase";

const uid = getUser().uid;

export function saveChoosedImage(image, uid) {
  const choosedImage = new ChoosedImage();
  choosedImage.uid = getUser().uid;
  choosedImage.key = image.alt;
  choosedImage.id = image.id;
  return getCollectionByName("image")
    .doc()
    .set(Object.assign({}, choosedImage));
}

export function getChoosedImage() {
  const data = [];

  return getCollectionByName("image")
    .where("uid", "==", getUser().uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
        });
      });
      return data;
    });
}

export function deleteChoosedImage(key) {
  return getCollectionByName("image")
    .where("key", "==", key)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
}
