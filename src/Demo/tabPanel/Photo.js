import react, { useState, useEffect } from "react";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { getStorage } from "../../utils/firebase";
import { getUser, isLoggedIn } from "../../utils/Auth";
import { getImgData, uploadImgData } from "../../api/photo.service";
import LoginDialog from "../login/LoginDialog";
import { GridList, GridListTile } from "@material-ui/core";

const storage = getStorage();
const uid = getUser().uid;

const useStyles = makeStyles(() =>
    createStyles({
        upload: {
            marginBottom: "20px"
        },
        
        gridListTile: {
            border: "1px solid #000000"
        },
        img: {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            cursor: "pointer"
        },
    }),
);

export default function Photo({ onChangeImg }) {
    const classes = useStyles();
    const [login, setLogin] = useState(false);
    const [image, setImage] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);
    const [progress, setProgress] = useState(0);

    const loadImage = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setProgress(0)
        }
    }
    const handleUpload = () => {
        if (isLoggedIn()) {
            if (image) {
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
                                uploadImgData(image.name, url);
                            });
                    }
                );
            }
        } else setLogin(true);

    };

    useEffect(() => {
        if (isLoggedIn()) {
            getImgData().then((res) => {
                setImgUrl(res);
            })
        }
    });

    return (
        <div>
            <div className={classes.upload}>
                <progress value={progress} max="100" />
                <br />
                <input type="file" onChange={loadImage} />
                <button onClick={handleUpload}>Upload</button>

            </div>
            <GridList cols={3}>
                {imgUrl && imgUrl.map((img) => (
                    <GridListTile className={classes.gridListTile} >
                        <img className={classes.img} src={img.url} alt={img.name} onClick={e => onChangeImg(e)} />
                    </GridListTile>
                ))}
            </GridList>
            <LoginDialog login={login} setLogin={setLogin} />
        </div>
    )
}