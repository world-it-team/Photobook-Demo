import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import getFirebase from "../../utils/firebase";
import { fromFirebase } from "../../api/user.service";
import { setUser } from "../../utils/Auth";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {createUserDoc} from "../../api/user.service";

const useStyles = makeStyles((theme) => ({
    root:{
        width:"100%",
        height:"100%",
        [theme.breakpoints.up("xs")]: {
           margin:" 30% auto",
        }
    },
    form:{
        [theme.breakpoints.up("xs")]: {
            margin:"0 50px",
         }
    },
    text:{
        textAlign:"center "
    },
    row:{
        display:"flex",
        flexDirection: "column",
        margin: "20px 0",
    },
    button:{
        display:"block",
        margin:"0 auto"
    },
    singUp:{
      display:"block",
      textAlign:"center "
    },
    errors:{
      color:"red"
    }

}));

const firebase = getFirebase();


function Login({ redirectTo }) {
    const classes = useStyles();

    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    function getUiConfig() {
        return {
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          ],
          callbacks: {
            signInSuccessWithAuthResult: () => {
              const user = fromFirebase();
              createUserDoc(user, user.displayName)
              setUser(user);
              window.location.reload()
            },
          },
        };
      }
    
    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Định dạng email của bạn không đúng")
            .required("Hãy nhập email"),
        password: yup
            .string()
            .required("Hãy nhập pasword"),
      });
    const formik = useFormik({
        initialValues: {
          ...state
        },
        validationSchema: validationSchema,
          onSubmit: (values) => {
            let { email, password } = values
            console.log(values)
            setState(prevState => ({
                ...prevState,
                email: email,
                password: password
            }));
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch((error) => {
                  console.log(error)
                  switch(error.code){
                      case "auth/user-not-found":
                      case "auth/email-already-in-use":
                          setErrorEmail(error.message);
                          break;
                      case "auth/wrong-password":
                          setErrorPassword(error.message);
                          break;
                  }
              });
          },
        });
    
      return (
      <div className={classes.root}>
        <div  className={classes.form}>
            <form  onSubmit={formik.handleSubmit} >
                <Typography variant="h2" className={classes.text}>
                    LogIn
                </Typography>
                <div className={classes.row}>
                <Typography  variant="h7" gutterBottom className={classes.label}>Email</Typography>
                <TextField 
                    className={classes.text}
                    variant="outlined"
                    size="small"
                    name="email"
                    placeholder="NguyenvanA@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && 
                    (<div className={classes.errors}>{formik.errors.email}</div>)}
                    {(<div className={classes.errors}>{errorEmail} </div>)}
                </div>
                <div className={classes.row}>
                <Typography  variant="h7" gutterBottom className={classes.label}>Password</Typography>
                <TextField 
                    className={classes.text}
                    variant="outlined"
                    size="small"  
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && 
                    (<div className={classes.errors}>{formik.errors.password}</div>)}
                    {(<div className={classes.errors}>{errorPassword} </div>)}
                </div>
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        SingIn
                </Button>
            </form>
        </div>
       <div className={classes.socia}>
        {firebase && (
            <StyledFirebaseAuth
              uiConfig={getUiConfig()}
              firebaseAuth={firebase.auth()}
            />
          )}
       </div>
       <Typography  variant="h6" gutterBottom className={classes.singUp}>SingUp</Typography>
      </div>
      )
    };
    
    export default Login;