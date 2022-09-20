import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HomeIcon from '@mui/icons-material/Home';
import { PersonSharp } from "@mui/icons-material";
import Createpost from "./Createpost";
import {Link} from 'react-router-dom'
const UserNav = () =>{
    const API_endpoint = ""
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [userRoute, setUserRoute] = useState("")
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const getUser = async () =>{
        const tokenPresent = localStorage.getItem('jwtoken')
        if(!tokenPresent){
            return
        }
        const resp = await fetch(API_endpoint + "/currprofile",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "AUthorization":"Bearer "+tokenPresent
            }
        })
        const respJson = await resp.json()
       
        if(respJson.user){
            setUserLoggedIn(true)
        }
        const username = respJson.user

        setUserRoute(`${username}`)
       }

       useEffect(() =>{
        getUser()
       },[userRoute])

    const logoustUser = () =>{
        localStorage.clear()
        navigate('/accounts/signin')
    }
    
    

    return(
        <>
            <nav className="user_navbar">
                <div className="logo">
                    <h1>Reinstagram</h1>
                </div>
                {
                    userLoggedIn ? 
                    <div className="links">
                    <Link to = "/" className="link">
                        <HomeIcon/>
                    </Link>
                    <AddAPhotoIcon onClick = {() => setIsOpen(!isOpen)} style = {{cursor:"pointer"}}/>
                    <Createpost open={isOpen} onClose={() => setIsOpen(!isOpen)} style = {{cursor:"pointer"}}/>
                    <Link to = {userRoute} className="link">
                    <PersonSharp/>
                    </Link>
                   
                    <PowerSettingsNewIcon onClick = {logoustUser} style = {{cursor:"pointer"}}/>
                </div>
                    :

                    <div style = {{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-around"
                    }}>
                        <Link to = "/accounts/signin" className="link" style = {{
                            color:"rgb(0, 165, 255)",
                            margin:"0 10px 0 10px"
                            }}>
                            <strong>Sign in</strong>
                        </Link>
                        <Link to = "/accounts/signup" className="link" style = {{
                            color:"rgb(0, 165, 255)",
                            margin:"0 10px 0 10px"
                            }}>
                            <strong>Sign up</strong>
                        </Link>
                    </div>
                }
                
            </nav>
        </>
    )
}

export default UserNav