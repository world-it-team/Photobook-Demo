import React from 'react';
import Button from '@material-ui/core/Button';
import Alink from "../common/Alink";
import { getUser,setUser } from "../../utils/Auth";
import {handleVerifyEmail} from "../../api/user.service";
import {useParams} from "react-router-dom";



function RedirectPage() {
   
  // const userInfo =  fromFirebase();

  // console.log(userInfo)
  // userInfo.emailVerified = true
  // setUser(userInfo)
   var query = window.location.search.substring(1);
   var vars = query.split("&");
  //  var mode = '';
   var actionCode = '';

   for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    // if(pair[0] == 'mode'){
    //   mode = pair[1];
    // }

    if(pair[0] == 'oobCode'){
      actionCode = pair[1];
    }

   }
    console.log(actionCode)
    handleVerifyEmail(actionCode);
      return (
          <>
            <p>Xác thực Email Thành Công Ấn Continue để tiếp tục đăng Nhập</p>
            <Alink to = "/login">
        
                <Button variant="contained" color="primary" type="submit" >
                            Continue
                </Button>
            </Alink>
        </>
      )
    };
    
    export default RedirectPage;