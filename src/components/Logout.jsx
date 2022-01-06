import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'
import { logout } from "../redux/actionType";

function Logout(){
    const dispatch =useDispatch();
    dispatch(logout());
    const history = useHistory();
    history.push('/login')
    return null;
}

export default Logout;