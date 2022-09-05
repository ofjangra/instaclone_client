import React, {useState} from 'react'


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
                    <strong>{props.username}</strong>
                </div>
        </>
    )
}

export default ProfileStrip