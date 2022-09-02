import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HomeIcon from '@mui/icons-material/Home';
import { PersonSharp } from "@mui/icons-material";
import Createpost from "./Createpost";
import {Link} from 'react-router-dom'
const UserNav = () =>{
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const logoustUser = () =>{
        localStorage.clear()
        navigate('/signin')
    }

    return(
        <>
            <nav className="user_navbar">
                <div className="logo">
                    <h1>Reinstagram</h1>
                </div>
                <div className="links">
                    <Link to = "/" className="link">
                        <HomeIcon/>
                    </Link>
                    <AddAPhotoIcon onClick = {() => setIsOpen(!isOpen)} style = {{cursor:"pointer"}}/>
                    <Createpost open={isOpen} onClose={() => setIsOpen(!isOpen)} style = {{cursor:"pointer"}}/>
                    <Link to = "/profile" className="link">
                    <PersonSharp/>
                    </Link>
                   
                    <PowerSettingsNewIcon onClick = {logoustUser} style = {{cursor:"pointer"}}/>
                </div>
            </nav>
        </>
    )
}

export default UserNav