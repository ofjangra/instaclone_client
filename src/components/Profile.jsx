import React from "react";
import data from './galleryPosts'
import SettingsIcon from '@mui/icons-material/Settings';



const Profile = () =>{
    return(
        <>
        <div className="profileContainer">
       <div className="profileMain">
           <div className="profileInfo">
               <div className="profilePhoto">
                   <div>
                   <img src = "/img/p0.jpg"
                   alt = "profile photo"
                   />
                   </div>
               </div>
               <div className="profileDetails">
                   <div className="userName profileEdit">
                       <h5>kibo</h5>

                       <button>Edit Profile</button>

                       <span className="settingIcon"><SettingsIcon/></span>
                   </div>
                   <div className="entityCounts">
                       <span className="postCount"><strong>120</strong> posts</span>
                       <span className="followersCount"><strong>487</strong> followers</span>
                       <span className="followingCount"><strong>90</strong> followings</span>
                   </div>
                   <div className="bio">
                       <strong className="name">Pooja Verma</strong>
                       <span>Web developer</span>
                       <span className="webUrl"><a href = "https://ofjangra.com" className="link" style={{color: "rgb(3, 135, 243)"}}>ofjangra.com</a></span>
                   </div>
               </div>
           </div>
           <div className="gallery">

               {
                   data.map((post) =>{
                       return(
                        <div className="postPhoto" key={post.id}>
                        <img src = {post.imgSrc}
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
