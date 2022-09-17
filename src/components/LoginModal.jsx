import { Clear } from "@mui/icons-material";
import React from "react";
import * as ReactDom from "react-dom";
import { Link } from "react-router-dom";

const modalRoot = document.querySelector(".modalRoot");


const LoginModal = ({isOpen, onClose}) =>{
    if(!isOpen) {
        return null
    }
    return ReactDom.createPortal(
        <>
            <div style = {{
                height:"100vh",
                minHeight:"580px",
                width:"100%",
                position:"fixed",
                top:"0",
                left:"0",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <div style = {{
                    height:"320px",
                    width:"400px",
                    position:"relative",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    borderRadius:"10px"
                }}>
                    <Clear style={{
                        position:"absolute",
                        top:"10px",
                        right:"10px"
                    }} onClick = {onClose}/>
                    <div style = {{flexBasis:"50%", display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"1px solid gray"}}>
                        <Link to = "/accounts/signin" className="link">
                            <strong style = {{color:"rgb(0, 165, 255)"}}>Login</strong>
                        </Link>
                    </div>
                    <div style = {{flexBasis:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Link to = "/accounts/signup" className="link">
                            <strong style = {{color:"rgb(0, 165, 255)"}}>Signup</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </>, modalRoot
    )
}


export default LoginModal