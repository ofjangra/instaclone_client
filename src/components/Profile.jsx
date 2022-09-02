import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import SettingsIcon from '@mui/icons-material/Settings';
import UserNav from "./UserNav";

const Profile = () =>{

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username:"",
        name:"",
        profilePhoto:"",
        bio:"",
        website:"",
        posts:[]
    })


    const getUserData = async () =>{
        const tokenPresent = localStorage.getItem("jwtoken")

        if(!tokenPresent){
            navigate("/signin")
        }

        const resp = await fetch('http://localhost:5000/profile', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwtoken")
            }
        })

        const respJson = await resp.json()

        if(respJson.error){
            navigate("/error/404")
        }

        setUserData({
            username:respJson.userDetails.username,
            name:respJson.userDetails.name,
            profilePhoto:respJson.userDetails.photo_url,
            bio:respJson.userDetails.bio,
            website:respJson.userDetails.website,
            posts:respJson.posts
        })
        console.log(respJson)
    }

    useEffect(()=>{
        getUserData()
    }, [])
    return(
        <>
        <UserNav/>
        <div className="profileContainer">
       <div className="profileMain">
           <div className="profileInfo">
               <div className="profilePhoto">
                   <div>
                   <img src = {userData.profilePhoto}
                   alt = "profile photo"
                   />
                   </div>
               </div>
               <div className="profileDetails">
                   <div className="userName profileEdit">
                       <h5>{userData.username}</h5>
                       <Link to = "/editprofile">
                       <button>Edit Profile</button>
                       </Link>
                   </div>
                   <div className="entityCounts">
                       <span className="postCount"><strong>{"9"}</strong> posts</span>
                       <span className="followersCount"><strong>{"9"}</strong> followers</span>
                       <span className="followingCount"><strong>{"10"}</strong> followings</span>
                   </div>
                   <div className="bio">
                       <strong className="name">{userData.name}</strong>
                       <span>{userData.bio}</span>
                       <span className="webUrl"><a href = {userData.website} className="link" style={{color: "rgb(3, 135, 243)"}}>{userData.website}</a></span>
                   </div>
               </div>
           </div>
           <div className="gallery">
               {
                   
                   userData.posts.map((post) =>{
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
