import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Image from "../../common/Image";
import SearchIcon from "@material-ui/icons/Search";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { getStorage } from "../../../utils/firebase";
import { getUser, isLoggedIn } from "../../../utils/Auth";
import { getImgData, uploadImgData } from "../../../api/photo.service";

const storage = getStorage();
const uid = getUser().uid;




const useStyles = makeStyles((theme) => ({
  searchInput: {
    display: "flex",
    color: "#EAEAEA",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15,
  },
  tagContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  tag: {
    listStyle: "none",
    border: "1px solid grey",
    borderRadius: 4,
    padding: "5px 10px",
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "95%",
    maxHeight: "50vh",
    position: "relative",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // objectPosition:"50% 50%"
  },
  modal: {
    position: "relative",
    maxWidth: "100%",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "95%",
    height: "90%",
    objectFit: "contain",
  },
  buttonWrap: {
    width: "80%",
    maxHeight:40
  },
}));

const category = ["BlackPink", "Rose", "Lisa", "Jisoo", "Jennie"];

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function ChooseImage(props) {
  const classes = useStyles();
  const filterImage = (data, query) => {
    if (!query) {
      return data;
    }
    return data.filter((current) => {
      const searchResult = removeAccents(current.category.toLowerCase());
      return searchResult.includes(removeAccents(query));
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredImage = filterImage(props.data, searchQuery.toLowerCase());

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  
  const [login, setLogin] = useState(false);
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState(false);

  const handleOpen = (e) => {
  
    setOpen(true);
    setImage(e.target.src);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const chooseImage = () => {
  
//      if (isLoggedIn()) {
//       if (image) {
//         const uploadTask = storage.ref(`${uid}/${image.name}`).put(image);
//         uploadTask.on(
//             "state_changed",
//             snapshot => {
//                 const progress = Math.round(
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );
//                 setProgress(progress);
//             },
//             error => {
//                 console.log(error);
//             },
//             () => {
//                 storage
//                     .ref(uid)
//                     .child(image.name)
//                     .getDownloadURL()
//                     .then(url => {
//                         uploadImgData(image.name, url);
//                         setUpload(!upload)
//                     });
//             }
//         );
//     }
// } else setLogin(true);
//    setOpen(false);
  };


  React.useEffect(() =>{
   
  },[])
  
  return (
    <section >
      {/*Search Bar*/}
      <div className={classes.searchInput}>
        <input
          style={{ width: 200, height: 28 }}
          type="string"
          placeholder="Search image ..."
          onInput={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon style={{ color: "black" }} />
      </div>

      {/*Tag*/}
      <h3>Category</h3>
      <div className={classes.tagContainer}>
        {category.map((item, index) => (
          <li
            className={classes.tag}
            key={index}
            onClick={() => setSearchQuery(item.toLowerCase())}
          >
            {item} (
            {props.data.filter((x) => x.category === item.toLowerCase()).length}
            )
          </li>
        ))}
      </div>

      {/*Image List*/}
      <div className={classes.imageContainer}>
        <GridList cellHeight={80} className={classes.gridList} cols={3}>
          {filteredImage.map((tile) => (
            <GridListTile key={tile} cols={1} onClick={(e) => handleOpen(e)}>
              <Image {...tile.img} className={classes.image}/>
            </GridListTile>
          ))}
        </GridList>
        {/*Zoom Image When Click*/}
        <Modal className={classes.modal} open={open} onClose={handleClose} >
          <div className={classes.paper} >
            <img src={image} className={classes.modalImage} />
              <Grid container className={classes.buttonWrap}>
                <Grid container item xs={6} justify="flex-start">
                  <Button variant="contained" color="primary"
                     onClick={chooseImage}
                  >
                    Choose
                  </Button>
                </Grid>
                <Grid container item xs={6} justify="flex-end">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
        
          </div>
        </Modal>

        {/*Choosed Image Container*/}
        <div>
            
        </div>
      </div>
    </section>
  );
}
