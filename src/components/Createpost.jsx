import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as ReactDom from 'react-dom'
const modalRoot = document.querySelector('.modalRoot')


const Createpost = ({open, onClose}) =>{
    if(!open) return null;

    const inputRef = useRef(null)

    const fileRefClick = () =>{
        inputRef.current.click()
    }

    const [file, setFile] = useState(null)

    const [filePreview, setFilePreview] = useState()

    const [caption, setCaption] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        if (file){
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setFilePreview(reader.result)
        }
    }
    
       
    }, [file])

    const handleFileChange = (e) =>{
        let file = e.target.files[0]
        setFile(file)
    }



    const submitPost = async () =>{
        
        try{
        const data = new FormData()

        data.append('file', file)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name","ofjangra")

        console.log(data)

       const cloudinaryResp = await fetch("https://api.cloudinary.com/v1_1/ofjangra/image/upload",{
            method:"POST",
            body: data
        })

        const cloudinaryRespJson = await cloudinaryResp.json()


        const cloudRespImageUrl = await cloudinaryRespJson.url

        const savepost = await fetch("http://localhost:5000/createpost",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwtoken")
            },
            body:JSON.stringify({
                caption:caption,
                imageurl:cloudRespImageUrl
            })
        })
        navigate("/")
        onClose()
        const postSaveResp = await savepost.json()

        if(postSaveResp.error){
            alert(postSaveResp.error)
        }
        else if(postSaveResp.message){
           
        }

        

        
    } catch(err){
        console.log(err)
    }
        
    }



    return ReactDom.createPortal(
        <>
       
            <div className='createPostContainer'>
            
            <ClearIcon onClick={onClose} id = "closeModal"/>

                { file === null ?
                <div className='createPost'>
                    
                    <div className='postSelect'>
                        <div className='createPostTitle'>
                            <ArrowBackIcon onClick = {onClose} id = 'discardCreatePost'/>
                            <h6>Create a new post</h6>
                        </div>
                        <img src = "/img/createPost.png" alt = "post"/>
                        
                            <input type = "file"
                            onChange={handleFileChange}
                            ref = {inputRef}
                            />
                            <button  onClick={fileRefClick}>
                            Select Photo
                           </button>
                        
                    </div>
                </div>
                :
                <div className='postForm'>
                    <div className='postFormTitle'>
                    <ArrowBackIcon onClick = {onClose} id = 'discardCreatePost'/>
                        <h6>Create a Post</h6>
                    </div>
                    <div className='postFormDetails'>

                        <div className='photoPreview'>
                            <img src = {filePreview}
                            alt = "post"/>
                        </div>
                        <div className='postCaption'>
                        
                            <h6>Add a Caption</h6>
                            <input type = "text"
                                placeholder='Caption'
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                            <button className="btn" onClick={submitPost}>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            }
            </div>
        </>, modalRoot
    )
}

export default Createpost