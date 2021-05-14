import React, { useEffect } from "react";
import { NavLink, useLocation  } from "react-router-dom";

export default function ALink(props){
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return <NavLink {...props}>{props.children}</NavLink>
}