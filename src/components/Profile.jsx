import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfilesViewModal from "./ProfilesViewModal";
import LoginModal from "./LoginModal";
const API_endpoint = ""
const client_endpoint = ''
const Profile = ({userDetails, followersCount, posts, owner, loggedIn, following, follow, unfollow}) =>{

const [modalOpen, setModalOpen] = useState(false)

const [api, setApi] = useState("")

const [modalTitle, setModalTitle] = useState("")

const [open, setOpen] = useState(false)
  
   
const viewFollowers = (id) =>{
    setModalTitle("Followers")
    setApi(API_endpoint + `/allfollowers/${id}`)
    setModalOpen(true)
    
}
const viewFollowings = (id) =>{
    setModalTitle("Following")
    setApi(API_endpoint + `/allfollowings/${id}`)
    setModalOpen(true)
    
}
    return(
        <>
        <div className="profileContainer">
       <div className="profileMain">
           <div className="profileInfo">
               <div className="profilePhoto">
                   <div>
                   <img src = {userDetails.photo_url}
                   alt = "profile photo"
                   />
                   </div>
               </div>
               <div className="profileDetails">
                   <div className="userName profileEdit">
                       <h5>{userDetails.username}</h5>
                       {
                        owner ? 
                        <Link to = "/accounts/editprofile">
                       <button>Edit Profile</button>
                       </Link> : null
                       }
                       { 
                       !loggedIn ? 
                       <button onClick={() => setOpen(true)} style = {{
                        backgroundColor:"rgb(0, 165, 255)",
                        color:"#ffffff",
                        border:"none"
                        }}>Follow</button> :
                        !owner && !following ? 
                        <button onClick={follow} style = {{
                            backgroundColor:"rgb(0, 165, 255)",
                            color:"#ffffff",
                            border:"none"
                        }}>Follow</button>
                         :
                        !owner && following ?
                        <button onClick={unfollow}>Unfollow</button> :
                        null
                       }
                       
                   </div>
                   <div className="entityCounts">
                       <span className="postCount"><strong>{posts.length}</strong> posts</span>
                       {
                        followersCount === 0 ?
                        <span className="followersCount"><strong>{followersCount}</strong> followers</span> :
                        <span className="followersCount" onClick={() =>viewFollowers(userDetails.userId)} style = {{cursor:"pointer"}}>
                            <strong>{followersCount}</strong> followers</span>
                       }

                       {
                        userDetails.followingsCount === 0 ?
                        <span className="followingsCount"><strong>{userDetails.followingsCount}</strong> following</span> :
                        <span className="followingsCount" onClick={() =>viewFollowings(userDetails.userId)} style = {{cursor:"pointer"}}>
                            <strong>{userDetails.followingsCount}</strong> following</span>
                       }
                       
 
                   </div>
                   <div className="bio">
                       <strong className="name">{userDetails.name}</strong>
                       <span>{userDetails.bio}</span>
                       <span className="webUrl"><a href = {userDetails.website} className="link" style={{color: "rgb(3, 135, 243)"}}>{userDetails.website}</a></span>
                   </div>
               </div>
           </div>
           <div className="gallery">
               {
                   
                   posts.map((post) =>{
                       return(
                        <a href = {client_endpoint+`/p/${post._id}`} key={post._id}>
                        <div className="postPhoto" >
                        <img src = {post.imageurl}
                        alt = "post"/>
                    </div>
                    </a>
                       )
                   })
               }
             

           </div>
       </div>
       </div>
       <ProfilesViewModal isOpen={modalOpen} onClose= {() => setModalOpen(!modalOpen)} api = {api} title={modalTitle}/>
       <LoginModal isOpen={open} onClose = {()=>setOpen(!open)}/>
        </>
    )
}

export default Profile
