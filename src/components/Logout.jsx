import React from "react";
import {useHistory} from "react-router-dom";

function Logout(){
    const history = useHistory();
    localStorage.clear();
    history.push('/login')
    window.location.reload(true);
}

export default Logout;