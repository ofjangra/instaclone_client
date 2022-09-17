import React from 'react'
import { Link } from 'react-router-dom'


const ProfileStrip = (props) =>{
    return(

        <>
            
                <div className='profile_strip' style = {{
                    height:"auto",
                    width:"100%",
                    padding:"16px 10px 16px 10px",
                    borderBottom:"1px solid rgb(189, 189, 189)",
                    display:"flex",
                    alignItems:"center",
                }}>
                    <img src = {props.image_url} alt = "profile photo" style = {{
                        height:"30px",
                        width:"30px",
                        borderRadius:"15px",
                        marginRight:"20px"
                    }}/>
                    <a href = {`http://localhost:5173/${props.username}`} className="link">
                        <strong>{props.username}</strong>
                    </a>
                </div>
        </>
    )
}

export default ProfileStrip