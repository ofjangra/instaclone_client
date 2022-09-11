import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserNav from "./UserNav";
const API_endpoint = 'http://localhost:5000'
const Profile = ({userDetails, posts, owner}) =>{

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
                       
                   </div>
                   <div className="entityCounts">
                       <span className="postCount"><strong>{"9"}</strong> posts</span>
                       <span className="followersCount"><strong>{"9"}</strong> followers</span>
                       <span className="followingCount"><strong>{"10"}</strong> followings</span>
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
                        <div className="postPhoto" key={post._id}>
                        <img src = {post.imageurl}
                        alt = "post"/>
                    </div>
                       )
                   })
               }
             

           </div>
       </div>
       </div>
        </>
    )
}

export default Profile
