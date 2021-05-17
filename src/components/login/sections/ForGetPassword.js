import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';


const useStyles = makeStyles((theme) =>({
  root:{
    maxWidth: "100%",  
    background: "#fffffff7",
    borderRadius: "25px",
    paddingBottom: "20px",
    
  },
  title:{
    color: "#005CB2",
    padding: "1.5rem 0rem 0rem 1rem",
    marginBottom: "20px",
    fontSize : "24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    }
  },
  text:{
    width: '100%',
    background: '#e9ecec99',
    fontSize: "18px",
    "& input":{
      fontWeight: 300
    },
    "& textarea":{
      fontWeight: 300
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    }
  },
  label:{
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    }
  },

  row:{
    padding: '0 1rem 1rem 1rem'
  },
  button:{
    display: "block",
    padding:"0.5rem 1rem",
    margin: "30px auto",
    width: "30%"
  },
  errors:{
    color: '#FF0000',
    margin: '0.5rem 0 0 0.5rem',
    fontSize: "14px",
  },
  name: {
    display: "flex",
    justifyContent : "space-between"
  },
  name1: {
      width: "47%"
  },
  name2: {
    width: "47%"
  }
}));


const ForGetPassword  = () => { 
  const classes = useStyles();
  const [state, setState] = useState({
    email: "",
});

  const validationSchema = yup.object({
    email: yup
        .string()
        .email("Format email không đúng")
        .required("Hãy nhập email"),
  });

  const formik = useFormik({
    initialValues: {
      ...state
    },
    validationSchema: validationSchema,
      onSubmit: (values) => {
        document.forms.entry.submit();
        let {email} = values
        setState(prevState => ({
            ...prevState,
            email: email,
        }));
      },
    });

  return (
    <Container className={classes.container} >
      <Typography  variant="h6" gutterBottom className={classes.title}>会員登録</Typography>
      <form className={classes.root}   onSubmit={formik.handleSubmit} name="entry" action="">
        <div className={classes.row}>  
          <Typography  variant="h6" gutterBottom className={classes.label}>メールアドレス</Typography>      
          <TextField  
            className={classes.text}
            variant="outlined"
            size="small"
            name="email"
            placeholder="nguyenvana@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            />
          {formik.errors.email && formik.touched.email && 
          (<div className={classes.errors}>{formik.errors.email}</div>)} 
        </div>
      <Button variant="contained" color="primary" type="submit" className={classes.button}>
        Send
      </Button>
      </form>
    </Container>
  );
}
export default ForGetPassword;