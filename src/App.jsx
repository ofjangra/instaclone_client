import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ErrorPage from './components/Error'
import Preload from './components/Preload'
import Layout from './components/Layout'
const w = window.innerWidth

console.log(w)
const App = () =>{

    return(
        <>
        <Routes>
            <Route path = "/*" element = {<Layout/>}></Route>
            {/* <Route path = "/p/:id" element = {<Post/>}/> */}
            <Route path = "/accounts/signin" element = {<Login/>}/>
            <Route path = "/accounts/signup" element = {<Signup/>}/>
        </Routes>
        </>
    )
}

export default App