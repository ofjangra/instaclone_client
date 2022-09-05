import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import UserNav from './UserNav'

const API_endpoint = 'http://localhost:5000'

const EditProfile = () =>{
    
    const navigate = useNavigate()


    const [userData, setUserData] = useState({
        username:"",
        name:"",
        phone:"",
        bio:"",
        website:""
    })

    const [image, setImage] = useState(null)

    const [errors, setErrors] = useState({
        username: null,
        phone:null
    })

   

    const inputRef = useRef(null)

    const fileRefClick = () =>{
        inputRef.current.click()
    } 

    const handleFileChange = (e) =>{

        let file = e.target.files[0]
        const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
                setImage(reader.result)
            }
    }
    const handleInputChange = (e) =>{
        let name = e.target.name
        let value = e.target.value

        setUserData((lastValue) =>{
            switch(name){
                case "username" :
                    return{
                        username:value,
                        name:lastValue.name,
                        phone:lastValue.phone,
                        bio:lastValue.bio,
                        website:lastValue.website
                    }
                case "name" :
                    return{
                        username:lastValue.username,
                        name:value,
                        phone:lastValue.phone,
                        bio:lastValue.bio,
                        website:lastValue.website
                    } 
                case "phone" :
                    return{
                        username:lastValue.username,
                        name:lastValue.name,
                        phone:value,
                        bio:lastValue.bio,
                        website:lastValue.website
                    }
                case "bio" :
                    return{
                            username:lastValue.username,
                            name:lastValue.name,
                            phone:lastValue.phone,
                            bio:value,
                            website:lastValue.website
                        }
                case "website" :
                    return{
                                username:lastValue.username,
                                name:lastValue.name,
                                phone:lastValue.phone,
                                bio:lastValue.bio,
                                website:value
                            }
            }
        })
    }

    const getUserData = async () =>{
        const resp = await fetch(API_endpoint+'/profile', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwtoken")
            }
        })

        const respJson = await resp.json()

        setUserData({
            username:respJson.userDetails.username,
            name:respJson.userDetails.name,
            phone:respJson.userDetails.phone,
            bio:respJson.userDetails.bio,
            website:respJson.userDetails.website,
        })
        setImage(respJson.userDetails.photo_url)
    }

    useEffect(()=>{
        getUserData()
    }, [])



    const updateProfile = async () =>{
        try{
        const updateProfileResp = await fetch(API_endpoint+"/editprofile", {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwtoken')
            },
            body: JSON.stringify({
                username:userData.username,
                phone:userData.phone,
                name:userData.name,
                bio:userData.bio,
                website:userData.website
            })
        })
        const updateProfileRespJson = await updateProfileResp.json()

        console.log(updateProfileRespJson)

        if(updateProfileRespJson.error){
            setErrors({
                username: updateProfileRespJson.error.username,
                phone:updateProfileRespJson.error.phone
            })
        }
        if(updateProfileRespJson.message){
            navigate("/profile")
        }
        } catch(err){
            console.log(err)
        }
    }


    const updateProfilePhoto = async () =>{
        const data = new FormData()

        data.append('file', image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name","ofjangra")

        console.log(data)

       const cloudinaryResp = await fetch("https://api.cloudinary.com/v1_1/ofjangra/image/upload",{
            method:"POST",
            body: data
        })

        const cloudinaryRespJson = await cloudinaryResp.json()


        const cloudRespImageUrl = await cloudinaryRespJson.url

        const updatePhotoResp = await fetch(API_endpoint+'/editprofile/photo',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem('jwtoken')
            },
            body:JSON.stringify({
                photo_url:cloudRespImageUrl
            })
        })

        const updatePhotoRespJson = updatePhotoResp.json()

        console.log(updatePhotoRespJson)
    }

    return(
        <>
        <UserNav/>
            <div className='editProfile_wrapper'>
                <h3>Edit Profile</h3>
                <div className='editProfile'>
                    <div className='editField'>
                        <label htmlFor='image_editField'>Profile Photo</label>
                        <div className='image_editField' id = "image_editField">
                            <div className='profile_Photo'>
                                <img src = {image} alt = "profile Photo"/>
                            </div>
                            <input type = "file"
                            onChange={handleFileChange}
                            ref = {inputRef}
                            style ={{display:"none"}}
                            />
                            <div className='flex' style = {{
                                display:"flex", 
                                flexDirection:"column",
                                alignItems:"flex-start",
                                justifyContent:"space-around"
                                }}>
                            <button onClick = { fileRefClick} style = {{marginBottom:"10px"}}>New Photo</button>
                            <button style={{marginTop:"10px"}} onClick= {updateProfilePhoto}>Save Photo</button>
                            </div>
                        </div>
                    </div>
                    <div className='editField'>
                        <label htmlFor='username_editField'>Username</label>
                        <div className='username_editField' id = "username_editField">
                            <div className='text_editField'>
                                <input type = "text"
                                value={userData.username}
                                name="username"
                                onChange={handleInputChange}
                                />
                                {}
                            </div>
                            <p>{errors.username}</p>
                        </div>
                    </div>
                    <div className='editField'>
                        <label htmlFor='name_editField'>Name</label>
                        <div className='name_editField' id = "name_editField">
                            <div className='text_editField'>
                                <input type = "text"
                                value={userData.name}
                                name = "name"
                                onChange = {handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='editField'>
                        <label htmlFor='phone_editField'>Phone No.</label>
                        <div className='phone_editField' id = "phone_editField">
                            <div className='text_editField'>
                                <input type = "text"
                                value={userData.phone}
                                name="phone"
                                onChange = {handleInputChange}
                                />
                            </div>
                            <p>{errors.phone}</p>
                        </div>
                    </div>

                    <div className='editField'>
                        <label htmlFor='bio_editField'>Bio</label>
                        <div className='bio_editField' id = "bio_editField">
                            <div className='text_editField'>
                                <textarea
                                name = "bio"
                                value = {userData.bio}
                                onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='editField'>
                        <label htmlFor='website_editField'>Website</label>
                        <div className='website_editField' id = "website_editField">
                            <div className='text_editField'>
                                <input
                                value={userData.website}
                                name = "website"
                                onChange = {handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button onClick={updateProfile}>Save Profile</button>
                </div>
            </div>
        </>
    )
}



export default EditProfile