import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import getFirebase from "../../utils/firebase";
import {createUserDoc} from "../../api/user.service";
import {useHistory} from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root:{
        width:"100%",
        height:"100%",
        [theme.breakpoints.up("xs")]: {
           margin:" 20% auto",
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


function SingUp() {
    const classes = useStyles();
    const [state, setState] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const history = useHistory();
    const validationSchema = yup.object({
        displayName: yup
            .string()
            .required("Hãy nhập Name"),
        email: yup
            .string()
            .email("Định dạng email của bạn không đúng")
            .required("Hãy nhập email"),
        password: yup
            .string()
            .required("Hãy nhập pasword"),
            confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"),null],"Password không chùng")
            .required("Hãy nhập confirmPassword"),
      });
    const formik = useFormik({
        initialValues: {
          ...state
        },
        validationSchema: validationSchema,
          onSubmit: (values) => {
            let { email, password, displayName, confirmPassword} = values
            console.log(values)
            setState(prevState => ({
                ...prevState,
                displayName: displayName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            }));
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    user.sendEmailVerification();
                    alert("Email send")                 
                    createUserDoc(user,{displayName});
                    if(user){
                        history.push("/login");
                      }
                  })
                .catch((error) => {
                    switch(error.code){
                        case "auth/email-already-in-use":
                            setErrorEmail(error.message)
                            break;
                        case "auth/weak-password":
                            setErrorPassword(error.message)
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
                    SingUp
                </Typography>
                <div className={classes.row}>
                <Typography  variant="h7" gutterBottom className={classes.label}>Name</Typography>
                <TextField 
                    className={classes.text}
                    variant="outlined"
                    size="small"
                    name="displayName"
                    placeholder="Nguyen Van A"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.displayName && formik.touched.displayName && 
                    (<div className={classes.errors}>{formik.errors.displayName}</div>)}
                </div>
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
                    (<div className={classes.errors}>{formik.errors.email} </div>)}
                     {(<div className={classes.errors}>{errorEmail} </div>)}
                    
                </div>
                <div className={classes.row}>
                <Typography  variant="h7" gutterBottom className={classes.label}>Password</Typography>
                <TextField 
                    className={classes.text}
                    variant="outlined"
                    size="small"  
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && 
                    (<div className={classes.errors}>{formik.errors.password}</div>)}
                     {(<div className={classes.errors}>{errorPassword} </div>)}
                </div>
                <div className={classes.row}>
                <Typography  variant="h7" gutterBottom className={classes.label}>ConfirmPassWord</Typography>
                <TextField 
                    className={classes.text}
                    variant="outlined"
                    size="small"  
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && 
                    (<div className={classes.errors}>{formik.errors.confirmPassword}</div>)}
                </div>
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        SingUp
                </Button>
            </form>
        </div>
       <Typography  variant="h6" gutterBottom className={classes.singUp}>SingIn</Typography>
      </div>
      )
    };
    
    export default SingUp;