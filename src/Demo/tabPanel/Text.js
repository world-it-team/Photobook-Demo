import { makeStyles } from '@material-ui/core/styles';
import react, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    fontsize: {
      '& > *': {
        margin: theme.spacing(1),
        width: '5px',
      },
    },
    bold: {
        '& > *': {
          margin: theme.spacing(1),
          width: '5px',
        },
      },
  }));
export default function Text (){
    return(
        <div>
            <title>TEXT</title>  
            <p className = "fontfamily-lato">Lato</p>
            <p className = "fontfamily-hevitical">Hevitical</p>
            <p className = "fontfamily-sato">Sato</p>
            <div className="fontsize" >
                <TextField id="" label="Fontsize" />
            </div>
            <div className="bold" >
                <TextField id="" label="Bold" />
            </div>
        </div>
    )
}

