import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ErrorPage from './components/Error'
import Layout from './components/Layout'
const w = window.innerWidth

console.log(w)
const App = () =>{

    return(
        <>
        <Routes>
            <Route path = "/*" element = {<Layout/>}></Route>
            <Route path = "/accounts/signin" element = {<Login/>}/>
            <Route path = "/accounts/signup" element = {<Signup/>}/>
            <Route path = "/error" element = {<ErrorPage/>}/>
            <Route path='*' element = {<ErrorPage/>}/>
        </Routes>
        </>
    )
}

export default App