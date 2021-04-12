import react, { useState } from "react";
import { getStorage } from "../../utils/firebase";
import { getUser } from "../../utils/Auth";

const storage = getStorage();
const uid = getUser().uid;
export default function Photo() {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const loadImage = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setProgress(0)
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`${uid}/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref(uid)
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
    };
    return (
        <div>
            <progress value={progress} max="100" />
            <br />
            <input type="file" onChange={loadImage} />
            <button onClick={handleUpload}>Upload</button>
            <img id="output" src={url} width={100} height={100} />
        </div>
    )
}