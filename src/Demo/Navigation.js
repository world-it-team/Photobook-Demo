import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import ALink from "../common/Alink";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { getUser, logout, isLoggedIn } from "../utils/Auth";
import getFirebase from "../utils/firebase";
import LoginDialog from "./LoginDialog";

const drawerWidth = 200;
const firebase = getFirebase();

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
    },
    appBar: {
        zIndex: 1300,
        background:
            "linear-gradient(90deg, rgba(96,159,254,1) 0%, rgba(0,77,170,1) 100%)",
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    SingInButton: {
        textTransform: "none",
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0, 5),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    NaviLogo: {
        // flexGrow: 1,
        textDecoration: "none",
        // "&:focus": "none",
    },
    NaniSpace: {
        flexGrow: 1,
    },
    logo: {
        marginTop: 5,
        width: 70,
    },
    languageButtonText: {
        fontFamily: "'Roboto Condensed', sans-serif",
    },
    DialogContent: {
        padding: theme.spacing(10, 6),
    },
    loginTitle: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.main,
    },
    closeButton: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 1,
    },
    link: {
        textDecoration: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:active": {
            color: "#fff",
        },
    },
}));

const StyledMenu = withStyles({
    paper: {
        boxShadow:
            "0 2px 10px 0 rgba(0, 0, 0, 0.18), 0 2px 10px 0 rgba(0, 0, 0, 0.15)",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.main,
            minWidth: theme.spacing(6),
        },
        "& .MuiListItemText-primary": {
            color: theme.palette.grey[800],
        },
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function Navigation(props) {
    const classes = useStyles();
    const [login, setLogin] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickOpen = () => {
        setLogin(true);
    };

    const handleAvatarOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAvatarClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(firebase).then(() => {
            setAnchorEl(null);
        });
    };



    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Photo Editor
                    </Typography>
                    <div className={classes.NaniSpace}></div>
                    {isLoggedIn() ? (
                        <React.Fragment>
                            <IconButton onClick={handleAvatarOpen}>
                                <Avatar src={getUser().photoURL} />
                            </IconButton>
                            <StyledMenu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleAvatarClose}
                            >
                                <StyledMenuItem onClick={handleLogout}>
                                    <a className={classes.link} href="/">
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Thoát" />
                                    </a>
                                </StyledMenuItem>
                            </StyledMenu>
                        </React.Fragment>

                    ) : (
                        <Button
                            edge="start"
                            className={classes.SingInButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={handleClickOpen}
                        >
                            Đăng nhập
                        </Button>
                    )
                    }
                </Toolbar>
            </AppBar >

            <LoginDialog login={login} setLogin={setLogin} />
        </div >
    );
}

export default Navigation;
