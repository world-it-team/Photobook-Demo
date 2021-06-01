import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Image from "../../common/Image";
import SearchIcon from "@material-ui/icons/Search";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import checkBox from "../../../images/imagePage/checkbox.png";
import { getStorage, getCollectionByName } from "../../../utils/firebase";
import { getUser, isLoggedIn } from "../../../utils/Auth";
import { getImgData } from "../../../api/photo.service";
  

const uid = getUser().uid;

const useStyles = makeStyles((theme) => ({

}));

const category = ["All", "BlackPink", "Rose", "Lisa", "Jisoo", "Jennie"];

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

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
  const [image, setImage] = useState({ src: "", alt: "", id: null });
  const [choosedImageKey, setChoosedImageKey] = useState("");
  const [loader, setLoader] = useState(false);
  // console.log(image)
  const choosedImage = [];
  props.data
    .map((item) => item.img)
    .filter((current) => {
      for (let key in choosedImageKey) {
        if (choosedImageKey[key] === current.alt) {
          choosedImage.push(current);
        }
      }
    });

  const addCheckbox = () => {
    const elm = document.getElementById(image.id);

    elm.setAttribute("src", checkBox);
    // elm.removeEventListener("click",fc);
  };

  const handleOpen = (e) => {
    setOpen(true);
    setImage({ src: e.target.src, alt: e.target.alt, id: e.target.id });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const chooseImage = () => {
    if (isLoggedIn()) {
      if (image) {
        getCollectionByName("image").doc().set({
          uid: uid,
          key: image.alt,
          id: image.id
        });
      }
    }

    getImgData().then((data) => {
      const result = data
        .filter((result) => result.uid === uid)
        .map((result) => result.key)
        .sort();
      console.log(result);
      setChoosedImageKey(result);
    });
    // addCheckbox();
    setOpen(false);
  };

  React.useEffect(() => {}, []);

  return (
    <section>
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
            onClick={() =>
              item === "All"
                ? setSearchQuery("")
                : setSearchQuery(item.toLowerCase())
            }
          >
            {item} (
            {item === "All"
              ? props.data.length
              : props.data.filter((x) => x.category === item.toLowerCase())
                  .length}
            )
          </li>
        ))}
      </div>

      {/*Image List*/}
      <div className={classes.imageContainer}>
        <GridList cellHeight={80} className={classes.gridList} cols={3}>
          {filteredImage.map((tile, index) => (
            <GridListTile key={index} cols={1} onClick={(e) => handleOpen(e)}>
              <Image {...tile.img} className={classes.image} />
            </GridListTile>
          ))}
        </GridList>
        {/*Zoom Image When Click*/}
        <Modal className={classes.modal} open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <img
              src={image.src}
              alt={image.alt}
              className={classes.modalImage}
            />
            <Grid container className={classes.buttonWrap}>
              <Grid container item xs={6} justify="flex-start">
                <Button
                  variant="contained"
                  color="primary"
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
        <div className={classes.choosedImageContainer}>
          {choosedImage.map((tile, index) => (
            <div className={classes.choosedImageWrapper}>
              <Image {...tile} className={classes.choosedImage} key={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
