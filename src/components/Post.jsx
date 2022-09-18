import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostView from "./PostView";
import Preload from "./Preload";


const API_endpoint = 'http://localhost:5000'


const Post = () =>{
    const params = useParams()

    const {id} = params

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [data, setData] = useState({
        post:{},
        viewer:{
            username:"",
            id:""
        }
    })

    const fetchPost = async (id) =>{
        const headers = {
            "Content-Type":"application/json"
        }
        const tokenPresent = localStorage.getItem('jwtoken')

        if(tokenPresent){
            headers.Authorization = "Bearer "+tokenPresent
        }
        try{
            const resp = await fetch(API_endpoint + `/post/${id}`,{
                method:"GET",
                headers:headers
            })

            const respJson = await resp.json();

            console.log(respJson)
            setData({
                post:respJson.post,
                viewer:{
                    id:respJson.user_props.viewerID,
                    loggedIn:respJson.user_props.loggedIn
                }
            })

            setLoading(false)

            if (respJson.error){

                console.log(respJson.error)
            
            }
        } catch(err){
            console.log(err)
        }
    }


   useEffect(()=>{
       fetchPost(id)
   },[])

   const delete_Post = async (id) =>{
     
       try{
       const resp = await fetch(API_endpoint + `/deletepost/${id}`, {
           method:"DELETE",
           headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem('jwtoken')
           }
       })

       const respJson = await resp.json()

       navigate(`${data.post.postedBy.username}`)

       console.log(respJson)
    } catch(err){
        console.log(err)
    }
   }
   if (loading){
    return <Preload h = {"60px"} w = {"60px"} r = {"30px"}/>
   }

    return(
        <>
        <div className="home">
            <div className="homePosts">

                
                   
                            <PostView
                            post_id = {data.post._id}
                            deletePost = {() => delete_Post(id)}
                            publisherPhoto = {data.post.postedBy.photo_url}
                            publisher = {data.post.postedBy.username}
                            publisherId = {data.post.postedBy._id}
                            viewerId = {data.viewer.id}
                            key = {id}
                            postId = {id}
                            imgSrc = {data.post.imageurl}
                            caption = {data.post.caption}
                            likes = {data.post.likes}
                            liked = {data.post.likes.includes(data.viewer.id) ? true : false}
                            comments = {data.post.comments}
                            />
                
            </div>
        </div>
        </>
    )
}


export default Post
