import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'


const ErrorPage = () =>{
    return(
        <>
            <div style = {{
                position: "absolute",
                top: "50%",
                left:"50%",
                transform: "translate(-50%, -50%)",
                height:"auto",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <h1 style = {{margin:"20px", fontWeight:"bold"}}>Page not found</h1>
                <Link className='link' to = "/" style = {{color: "#0387f3"}}><strong>Back to home</strong></Link>
            </div>
        </>
    )
}


export default ErrorPage