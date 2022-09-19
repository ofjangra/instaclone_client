import React from 'react'

const client_endpoint = "http://localhost:5173"

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
                    <a href = {client_endpoint + `/${props.username}`} className="link">
                        <strong>{props.username}</strong>
                    </a>
                </div>
        </>
    )
}

export default ProfileStrip