import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'


const ErrorPage = () =>{
    useEffect(() =>{
        localStorage.clear()
    }, [])
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
                <h1 style = {{margin:"20px", fontWeight:"bold"}}>Oops Something went wrong!!</h1>
                <Link className='link' to = "/signin" style = {{color: "#0387f3"}}><strong>Back to Login</strong></Link>
            </div>
        </>
    )
}


export default ErrorPage