import React, {useState} from "react";

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import HomeIcon from '@mui/icons-material/Home';
import { PersonSharp } from "@mui/icons-material";
import Createpost from "./Createpost";

const UserNav = () =>{
    const [isOpen, setIsOpen] = useState(false)

    return(
        <>
            <nav className="user_navbar">
                <div className="logo">
                    <h1>Instagram</h1>
                </div>
                <div className="links">
                    <HomeIcon/>
                    
                
                    <AddAPhotoIcon onClick = {() => setIsOpen(!isOpen)}/>
                    
                    <Createpost open={isOpen} onClose={() => setIsOpen(!isOpen)}/>
                    <PersonSharp/>
                </div>
            </nav>
        </>
    )
}

export default UserNav