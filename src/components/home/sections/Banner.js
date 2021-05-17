import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import image1 from "../../../images/home/banner-image1.png";
import image2 from "../../../images/home/banner-image2.png";
import image3 from "../../../images/home/banner-image3.png";
import image4 from "../../../images/home/banner-image4.png";

const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: "calc((var(--vh, 1vh) * 100) - 250px)",
    background: `url(${image1}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: " center",
    animationName:`$bg-animate`,
    animationDuration:"30s",
    animationDirection:"alternate",
    animationFillMode:`forwards`,
    animationIterationCount:`infinite`,
    animationTimingFunction:`cubic-bezier(1,0,0,1)`,
    animationDelay:"3s",
    position: "relative",
  },
  "@keyframes bg-animate": {
    "0%": {
      background: `url(${image1}) no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: " center",
    },
    "25%": {
      background: `url(${image2}) no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: " center",
    },
    "50%": {
      background: `url(${image3}) no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: " center",
    },
    "75%": {
      background: `url(${image4}) no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: " center",
    },
    "100%": {
      background: `url(${image1}) no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: " center",
    },
  },
  bannerContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    color: "white",
  },
}));

if (typeof window !== "undefined") {
  let vh = window.innerHeight * 0.01;
  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}
export default function Banner() {
  const classes = useStyles();
  return (
    <section className={classes.banner}>
      <div className={classes.bannerContent}>
         <h2 className={classes.text}>Content</h2>
      </div>
    </section>
  );
}
