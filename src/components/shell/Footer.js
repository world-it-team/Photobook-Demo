import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Alink from "../common/Alink";

//icon
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import SvgIcon from "@material-ui/core/SvgIcon";
const useStyles = makeStyles((theme) => ({
  footer: {
    background: "#A9A9F5",
    backgroundImage:
    "linear-gradient(to right,#f55f8d ,#f8ae56 0%,#A9A9F5 100%)",

    boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    width: "100%",
    font: "bold 16px sans-serif",
    textAlign: "left",
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",

    [theme.breakpoints.up("xs")]: {
      font: "bold 14px sans-serif",
      padding: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "170px",
      paddingRight: "150px",
    },
    [theme.breakpoints.up("md")]: {
    },
  },
  Container: {
    maxWidth:"1000px",

    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
    },

    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      // margin:"0 auto"
    },
  },
  footerLeft: {
    // maxWidth: "300px",
    // margin: "0 auto",
  },
  conpanytitle: {
    color: "#ffffff",
    font: "normal 36px 'Roboto', cursive",
    margin: "0 0 10px",
  },
  logotitle: {
    color: "#5383d3",
  },
  footerLinks: {
    color: "#ffffff",
    margin: "0 0 10px",
    padding: "0",
  },
  footerLink: {
    display: "inline-block",
    lineHeight: "1.8",
    textDecoration: "none",
    color: "inherit",
  },
  footerCompanyName: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "normal",
    margin: 0,
    // [theme.breakpoints.up("xs")]: {
    //   fontSize: "12px",
    // },
  },
  footerIcons: {
    marginTop: "40px",
  },
  icon: {
    display: "inline-block",
    width: "35px",
    height: "35px",
    cursor: "pointer",
    // backgroundColor: "#33383b",
    borderRadius: "2px",

    fontSize: "20px",
    color: "#FFD700",
    textAlign: "center",
    lineHeight: "35px",

    marginRight: "3px",
    marginBottom: "5px",
  },
  footerRight: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
    },

    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row",
      paddingTop:"10px"
    },
  },
  contact: {
    display: "inline-block",
    verticalAlign: "top",
    margin: "15px 10px 0 40px",
    width:"80px",
    color: "#ffffff",
    [theme.breakpoints.down("md")]: {
      marginTop: "15px",

      marginBottom: "30px",
    },
  },
  form: {
    display: "inline-block",
  },
  input: {
    display: "block",
    borderRadius: "3px",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    opacity:"0.9",
    boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.1)",
    border: "none",
    resize: "none",

    font: "inherit",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#d1d2d2",

    width: "400px",
    padding: "18px",

    height: "55px",
    marginBottom: "15px",
    [theme.breakpoints.up("xs")]: {
      width: "250px",
      padding: "18px",
    },

    [theme.breakpoints.up("sm")]: {
      width: "350px",
      padding: "18px",
    },
  },
  textfield: {
    display: "block",
    borderRadius: "3px",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    opacity:"0.9",

    boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.1)",
    border: "none",
    resize: "none",

    font: "inherit",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#ffffff",

    width: "400px",
    padding: "18px",

    height: "100px",
    marginBottom: "20px",
    [theme.breakpoints.up("xs")]: {
      width: "250px",
      padding: "18px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "350px",
      padding: "18px",
    },
  },

  sendButton: {
    borderRadius: "3px",
    backgroundColor: "#5383D3",
    color: "#ffffff",
    border: 0,
    padding: "15px 50px",
    fontWeight: "bold",
    float: "right",
    [theme.breakpoints.up("xs")]: {},
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container className={classes.Container}>
        <Container className={classes.footerLeft}>
          <h3 className={classes.conpanytitle}>
            Company<span className={classes.logotitle}>logo</span>
          </h3>

          <p className={classes.footerLinks}>
            <Alink className={classes.footerLink} to="/">
              Home
            </Alink>
            ・
            <Alink className={classes.footerLink} to="/">
              Blog
            </Alink>
            ・
            <Alink className={classes.footerLink} to="/">
              Pricing
            </Alink>
            ・
            <Alink className={classes.footerLink} to="/">
              About
            </Alink>
            ・
            <Alink className={classes.footerLink} to="/">
              Faq
            </Alink>
            ・
            <Alink className={classes.footerLink} to="/">
              Contact
            </Alink>
          </p>

          <p className={classes.footerCompanyName}>Company Name © 2021</p>

          <div className={classes.footerIcons}>
            <a
              href="https://www.facebook.com/worldoutsource"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon className={classes.icon} />
            </a>
            <a
              href="https://www.instagram.com/world_recruit/"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon className={classes.icon}></TwitterIcon>
            </a>
            <a
              href="https://twitter.com/world_recruit"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className={classes.icon}></LinkedInIcon>
            </a>
            <a
              href="https://twitter.com/world_recruit"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className={classes.icon}></GitHubIcon>
            </a>
          </div>
        </Container>
        <Container className={classes.footerRight}>
          <p className={classes.contact}>Contact Us</p>
          <form className={classes.form}>
            <input
              className={classes.input}
              type="text"
              name="email"
              placeholder="Email"
            />
            <textarea
              className={classes.textfield}
              name="message"
              placeholder="Message"
            ></textarea>
            {/* <textField
            className={classes.textfield}
            name="message"
            placeholder="Message"
            
          ></textField> */}

            <Button className={classes.sendButton}>Send</Button>
          </form>
        </Container>
      </Container>
    </footer>
  );
}
