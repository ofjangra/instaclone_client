import React from "react";
import {Route, Routes } from "react-router-dom";
import UserNav from "./UserNav";
import Home from './Home'
import User from "./User";
import EditProfile from "./EditProfile";

const Layout = () => {
    return(
        <>
         <UserNav/>

        <Routes>
            <Route path="" element = {<Home/>}/>
            <Route path = ":username" element = {<User/>}/>
            <Route path = "accounts/editprofile" element = {<EditProfile/>}/>
        </Routes>
        </>
       
    )
}

export default Layout