import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import ErrorPage from './components/Error'
import EditProfile from './components/EditProfile'

const App = () =>{

    return(
        <>
        <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/signin" element = {<Login/>}/>
            <Route path = "/signup" element = {<Signup/>}/>
            <Route path = '/profile' element = {<Profile/>}/>
            <Route path = "editprofile" element = {<EditProfile/>}/>
            <Route path = "/error" element = {<ErrorPage/>}/>
        </Routes>
        </>
    )
}

export default App