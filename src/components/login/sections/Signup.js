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


const HelpForm  = () => { 
  const classes = useStyles();
  
  
  const [state, setState] = useState({
    fistName: "",
    lastName : "",
    email: "",
    password: "",
    confirmPassword : ""
});

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = yup.object({
    fistName: yup
        .string()
        .required("Hãy nhập họ tên"),
    lastName: yup
        .string()
        .required("Hãy nhập họ tên"),
    email: yup
        .string()
        .email("Format email không đúng")
        .required("Hãy nhập email"),
    password: yup
        .string()
        .min(6)
        .required("Hãy nhập mật khẩu"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'password must match')
        .required("Hãy nhập lại mật khẩu"),
  });

  const formik = useFormik({
    initialValues: {
      ...state
    },
    validationSchema: validationSchema,
      onSubmit: (values) => {
        document.forms.entry.submit();
        let { fistName, lastName, email, password, confirmPassword} = values
        setState(prevState => ({
            ...prevState,
            fistName: fistName,
            lastName : lastName,
            email: email,
            password: password,
            confirmPassword : confirmPassword
        }));
      },
    });

  return (
    <Container className={classes.container} >
      <Typography  variant="h6" gutterBottom className={classes.title}>会員登録</Typography>
      <form className={classes.root}   onSubmit={formik.handleSubmit} name="entry" action="">
        <div className={classes.row}>
          <Typography  variant="h6" gutterBottom className={classes.label}>お名前</Typography>
          <div className={classes.name}>
              <div className={classes.name1}>
            <TextField 
                className={classes.text}
                variant="outlined"
                size="small"
                name="fistName"
                placeholder="Nguyễn Văn A"
                value={formik.values.fistName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                />
                {formik.errors.fistName && formik.touched.fistName && 
                (<div className={classes.errors}>{formik.errors.fistName}</div>)}
            </div>
            <div className={classes.name2}>
            <TextField 
                className={classes.text}
                variant="outlined"
                size="small"
                name="lastName"
                placeholder="Nguyễn Văn A"
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                />
                {formik.errors.lastName && formik.touched.lastName && 
                (<div className={classes.errors}>{formik.errors.lastName}</div>)}
            </div>
            </div>
        </div>
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
            // onBlur={formik.handleBlur}
            />
          {formik.errors.email && formik.touched.email && 
          (<div className={classes.errors}>{formik.errors.email}</div>)} 
        </div>
        <div className={classes.row}> 
          <Typography  variant="h6" gutterBottom className={classes.label}>パスワード</Typography>      
          <TextField  
            className={classes.text} 
            variant="outlined"
            size="small"
            name="password"
            placeholder="+818098926532"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
          {formik.errors.password && formik.touched.password && 
            (<div className={classes.errors}>{formik.errors.password}</div>)}
        </div> 
        <div className={classes.row}> 
          <Typography  variant="h6" gutterBottom className={classes.label}>パスワード確認</Typography>   
          <TextField  
            className={classes.text} 
            variant="outlined"
            size="small"
            name="confirmPassword"
            placeholder="Từ vựng công nghệ thông tin"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />    
            {formik.errors.confirmPassword && formik.touched.confirmPassword && 
            (<div className={classes.errors}>{formik.errors.confirmPassword}</div>)}                
        </div>   
      <Button variant="contained" color="primary" type="submit" className={classes.button}>
        登録
      </Button>
      </form>
    </Container>
  );
}
export default HelpForm;