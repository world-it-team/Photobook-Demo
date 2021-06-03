import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import getFirebase from "../../utils/firebase";
import { useFormik } from 'formik';
import {useHistory} from "react-router-dom";
import Alink from "../common/Alink";
import * as yup from 'yup';
import {getUserLogin ,loadingUserInfo,fromFirebase,addOrUpdateUserInfo} from "../../api/user.service";
import { getUser,setUser } from "../../utils/Auth";


const useStyles = makeStyles((theme) => ({
    root:{
        width:"100%",
        height:"100%",
        margin:" 30% auto",
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
function Login() {
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const history = useHistory();

    function getUiConfig() {
        return {
          signInFlow: "popup",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          ],
          callbacks: {
            signInSuccessWithAuthResult: () => {
              getUserLogin()
              loadingUserInfo().then((doc)=>{
                console.log(doc)
                if(doc.popup === true){
                  history.push("/popup");
                  doc.popup = false;
                  addOrUpdateUserInfo(doc)
                }else{
                 history.push("/");
                }
               });

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
            setState(prevState => ({
                ...prevState,
                email: email,
                password: password
            }));
            
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                  var user = userCredential.user;
                  console.log(getUser())
                  const userInfo =  fromFirebase();
                  setUser(userInfo)
                  console.log(user.emailVerified)
              
                })
                .catch((error) => {
                  switch(error.code){
                      case "auth/user-not-found":
                      case "auth/email-already-in-use":
                          setErrorEmail(error.message);
                          break;
                      case "auth/wrong-password":
                          setErrorPassword(error.message);
                          break;
                      default:
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
                        SignIn
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
      <Alink to="/signup">
        <Typography  variant="h6" gutterBottom className={classes.singUp}>SignUp</Typography>
      </Alink>
      </div>
      )
    };
    
    export default Login;