import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Createpost from './components/Createpost'

const App = () =>{
  

    return(
        <>
        {/* <Navbar/> */}
        <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/accounts/signin" element = {<Login/>}/>
            <Route path = "/accounts/signup" element = {<Signup/>}/>
            <Route path = "/profile" element = {<Profile/>}/>
            {/* <Route path = "/createpost" element = {<Createpost/>}/> */}
        </Routes>
        </>
    )
}

export default App