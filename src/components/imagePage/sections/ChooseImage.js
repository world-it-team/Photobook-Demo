import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Image from "../../common/Image";
import SearchIcon from "@material-ui/icons/Search";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ALink from "../../common/Alink";
import { getUser, isLoggedIn } from "../../../utils/Auth";
import {
  getChoosedImage,
  saveChoosedImage,
  deleteChoosedImage,
} from "../../../api/photo.service";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  /*Search Tag*/
  searchInput: {
    display: "flex",
    color: "#EAEAEA",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15,
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
      paddingRight: "30px",
      marginTop: "30px",
    },
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
  tagCategory: {
    [theme.breakpoints.up("md")]: {
      fontSize: "36px",
      color: "#004EB4",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
      color: "#004EB4",
    },
  },
  /*Image List Container*/
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
    [theme.breakpoints.up("md")]: {
      height: 680,
    },
  },
  gridListTile: {
    height: "100px !important",
    [theme.breakpoints.up("sm")]: {
      height: "300px !important",
    },
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 1,
  },
  gridItemWrap: {
    position: "relative",
  },
  doneIcon: {
    width: 70,
    height: 50,
    position: "absolute",
    color: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  /*Zoom, show Modal*/
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
    [theme.breakpoints.only("sm")]: {
      width: "80%",
      height: "50%",
    },
  },
  buttonWrap: {
    width: "80%",
    maxHeight: 40,
  },
  /* Choosed Image*/
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
    [theme.breakpoints.up("sm")]: {
      minHeight: 300,
      maxWidth: "95%",
      margin: "auto",
    },
    [theme.breakpoints.up("md")]: {
      minHeight: 400,
      maxWidth: "95%",
      margin: "auto",
    },
  },
  choosedImageWrapper: {
    position: "relative",
    width: 45,
    height: 45,
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      height: "200px",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      height: "300px",
    },
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
  choosedImageTitle: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
      color: "#004EB4",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "36px",
      color: "#004EB4",
    },
  },
}));

const blurStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(1,1,1,0.4)",
  zIndex: 2,
  display: "none",
  opacity: 1,
};
const category = ["All", "BlackPink", "Rose", "Lisa", "Jisoo", "Jennie"];

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function filterImage(data, query) {
  if (!query) {
    return data;
  }
  return data.filter((current) => {
    const searchResult = removeAccents(current.category.toLowerCase());
    return searchResult.includes(removeAccents(query));
  });
}
function getSrc(src) {
  const results = src.split("/");
  const imgFileName = results[results.length - 1];
  return require("../../../images/imagePage/" + imgFileName).default;
}
function showBlur(data) {
  const compareKey = data.map((item) => item.alt);
  const chooseElement = [...document.getElementsByClassName("blur")].filter(
    (element) => compareKey.includes(element.id)
  );
  const unChooseElement = [...document.getElementsByClassName("blur")].filter(
    (element) => !compareKey.includes(element.id)
  );
  chooseElement.map((elm) => (elm.style.display = "block"));
  unChooseElement.map((elm) => (elm.style.display = "none"));
}

export default function ChooseImage(props) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({ src: "", alt: "", id: null });
  const [choosedImageKey, setChoosedImageKey] = useState("");
  const filteredImage = filterImage(props.data, searchQuery.toLowerCase());

  const handleOpen = (e) => {
    setOpen(true);
    setImage({ src: e.target.src, alt: e.target.alt, id: e.target.id });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const chooseImage = () => {
    if (isLoggedIn() && choosedImageKey.includes(image.alt) === false)
      saveChoosedImage(image);
    setOpen(false);
  };

  const unChoose = (e) => {
    deleteChoosedImage(e.target.id);
  };

  const choosedImage = props.data
    .map((item) => item.img)
    .filter((item) => choosedImageKey.includes(item.alt));

  /* Get Choosed Image from Firebase */
  React.useEffect(() => {
    getChoosedImage().then((data) => {
      const result = data.map((result) => result.key);
      setChoosedImageKey(result);
    });
  });

  /* Set Style Choosed Element */
  React.useEffect(() => {
    showBlur(choosedImage);
  }, [choosedImage]);

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
      <h3 style={{ marginLeft: "2.5%" }} className={classes.tagCategory}>
        Category
      </h3>
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
        <GridList className={classes.gridList} cols={3}>
          {filteredImage.map((tile, index) => (
            <GridListTile
              className={classes.gridListTile}
              key={index}
              cols={1}
              style={{ position: "relative" }}
            >
              <img
                src={getSrc(tile.img.src)}
                alt={tile.img.alt}
                className={classes.image}
                onClick={(e) => handleOpen(e)}
                id={tile.img.id}
              />

              <div
                onDoubleClick={(e) => unChoose(e)}
                className="blur"
                style={blurStyle}
                id={tile.img.alt}
              >
                <DoneIcon
                  className={classes.doneIcon}
                  id={tile.img.alt}
                  onDoubleClick={(e) => unChoose(e)}
                />
              </div>
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
        <h3 className={classes.choosedImageTitle}>選んだ写真</h3>
        <div className={classes.choosedImageBox}>
          {choosedImage.map((tile, index) => (
            <div className={classes.choosedImageWrapper}>
              <Image {...tile} className={classes.choosedImage} key={index} />
            </div>
          ))}
        </div>

        <ALink to={`/photoedit`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.nextStepBtn}
          >
            Photo Edit
          </Button>
        </ALink>
      </div>
    </section>
  );
}
