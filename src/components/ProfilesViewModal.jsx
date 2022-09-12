import React, { useEffect, useState } from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import ProfileStrip from './ProfileStrip'
import * as ReactDom from "react-dom";
const modalRoot = document.querySelector(".modalRoot");
const ProfilesViewModal = ({isOpen, onClose, api, title}) => {
  if(!isOpen) return null;

  const [profilesArray, setProfilesArray] = useState([])

  const getProfiles = async() =>{
    const resp = await fetch(api,{
      method:"GET"
    })
    const respJson = await resp.json()
    console.log(respJson)
    setProfilesArray(respJson)
  }

  useEffect(()=>{
    getProfiles()
  }, [])
  return ReactDom.createPortal(
    <>
        <div className='LC_modalContainer' style = {{
          height:"auto",
          width:"auto",
          position:"fixed",
          top:"50%",
          left:"50%",
          transform:"translate(-50%, -50%)",
          padding:"30px",
        }}>
         
            <div className='usersCard' style = {{
              height:"320px",
              width:"320px",
              backgroundColor:"#ffffff",
              boxShadow:"2px 2px 4px gray",
              padding:"20px",
              borderRadius:"10px",
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              position:"relative",
              backgroundColor:"#ffffff"
            }}>
              <div style={{width:"100%",
              position:"absolute",
              top:"0",
              left:"0",
              borderTopLeftRadius:"10px",
              borderTopRightRadius:"10px",
              height:"auto", 
              padding:"4px 10px 4px 10px",
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              borderBottom:"1px solid gray",
              }}>
                <strong>{title}</strong>
                <ClearIcon onClick = {onClose} style = {{
                  cursor:"pointer"
            }}/>
              </div>
              {
                profilesArray.map((profile) =>{
                  return(
                    <>
                      <ProfileStrip
                        key = {profile.id}
                        image_url = {profile.photo_url}
                        username = {profile.username}
                        followed = {false}/>
                    </>
                  )
                })
              }
            </div>
        </div>
    </>, modalRoot
  )
}

export default ProfilesViewModal