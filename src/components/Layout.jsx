import React from "react";
import {Route, Routes } from "react-router-dom";
import UserNav from "./UserNav";
import Home from './Home'
import User from "./User";
import EditProfile from "./EditProfile";
import Post from './Post'
import ErrorPage from "./Error";
const Layout = () => {
    return(
        <>
         <UserNav/>

        <Routes>
            <Route path="" element = {<Home/>}/>
            <Route path = ":username" element = {<User/>}/>
            <Route path = "accounts/editprofile" element = {<EditProfile/>}/>
            <Route path = "p/:id" element = {<Post/>}/>
            <Route path='*' element = {<ErrorPage/>}/>
            
        </Routes>
        </>
       
    )
}

export default Layout