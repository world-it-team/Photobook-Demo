import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Close } from "@material-ui/icons";
import Login from "./Login";
import { isLoggedIn, getUser } from "../utils/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
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
}));

function LoginDialog(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.setLogin(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Dialog
        open={props.login}
        onClose={handleClose}
      // aria-labelledby="form-dialog-title"
      // disableBackdropClick
      // disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent
          classes={{
            root: classes.DialogContent,
          }}
        >
          {!isLoggedIn() ? (
            <div>
              <Typography
                className={classes.loginTitle}
                component="h2"
                variant="h5"
              >
                Đăng nhập với
            </Typography>
              <Login />
            </div>

          ) : (
            <div>
              <Typography
                className={classes.loginTitle}
                component="h2"
                variant="h5"
              >
                Chào mừng {getUser().displayName}
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginDialog;
