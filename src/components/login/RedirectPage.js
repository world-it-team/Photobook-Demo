import React from 'react';
import Button from '@material-ui/core/Button';
import Alink from "../common/Alink";



function RedirectPage() {
    
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