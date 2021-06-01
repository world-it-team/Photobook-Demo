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
import { getUser, isLoggedIn } from "../../../utils/Auth";
import { getChoosedImage, saveChoosedImage } from "../../../api/photo.service";

// const storage = getStorage();

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
    maxHeight: 40,
  },
  choosedImageContainer: {
    width: "95%",
    margin: "auto",
  },
  choosedImageBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 90,
    maxWidth: 327,
    border: "1px solid lightblue",
    gap: 2,
  },
  choosedImageWrapper: {
    position: "relative",
    width: 45,
    height: 45,
  },
  choosedImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  nextStepBtn: {
    marginTop: 10,
  },
}));

const category = ["All", "BlackPink", "Rose", "Lisa", "Jisoo", "Jennie"];

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function ChooseImage(props) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({ src: "", alt: "", id: null });
  const [choosedImageKey, setChoosedImageKey] = useState("");


  const filterImage = (data, query) => {
    if (!query) {
      return data;
    }
    return data.filter((current) => {
      const searchResult = removeAccents(current.category.toLowerCase());
      return searchResult.includes(removeAccents(query));
    });
  };
  const filteredImage = filterImage(props.data, searchQuery.toLowerCase());
  // const addCheckbox = () => {
  //   const elm = document.getElementById(image.id);
  //   elm.setAttribute("src", checkBox);
  //   // elm.removeEventListener("click",fc);
  // };

  const handleOpen = (e) => {
    setOpen(true);
    setImage({ src: e.target.src, alt: e.target.alt, id: e.target.id });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const chooseImage = () => {
    if (isLoggedIn() && choosedImageKey.includes(image.alt) == false)
      saveChoosedImage(image);
    setOpen(false);
  };

  const choosedImage = props.data
    .map((item) => item.img)
    .filter((item) => choosedImageKey.includes(item.alt));

  React.useEffect(() => {
    getChoosedImage().then((data) => {
      const result = data.filter(x => x.uid ===uid).map((result) => result.key);
      setChoosedImageKey(result);
    });
  },[getChoosedImage()]);

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
      <h3 style={{ marginLeft: "2.5%" }}>Category</h3>
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
      <p style={{ marginLeft: " 2.5%", marginBottom: 10 }}>Photo Choose!</p>
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
      </div>

      {/*Choosed Image Container*/}
      <div className={classes.choosedImageContainer}>
        <h3>選んだ写真</h3>
        <div className={classes.choosedImageBox}>
          {choosedImage.map((tile, index) => (
            <div className={classes.choosedImageWrapper}>
              <Image {...tile} className={classes.choosedImage} key={index} />
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.nextStepBtn}
        >
          Photo Edit
        </Button>
      </div>
    </section>
  );
}
