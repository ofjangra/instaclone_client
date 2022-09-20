import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Postcard from "./Postcard";
import Preload from "./Preload";
import Suggestions from "./Suggestions";


const API_endpoint = ""


const Home = () =>{
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [data, setData] = useState({
        posts:[],
        viewer:{
            username:"",
            id:""
        }
    })

    const fetchUser = async () =>{
        try{
            const tokenPresent = localStorage.getItem("jwtoken")

            if(!tokenPresent){
               return  navigate("/accounts/signin")
            }
            const resp = await fetch(API_endpoint + "/homefeed",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+tokenPresent
                }
            })

            const respJson = await resp.json();

            setData({
                posts:respJson.posts,
                viewer:{
                    username:respJson.viewer.username,
                    id:respJson.viewer.id
                }
            })

            setLoading(false)

            if (respJson.error){

                
                return navigate("/error")
            }
        } catch(err){
           
        }
    }


   useEffect(()=>{
       fetchUser()
   },[])

   const delete_Post = async (id) =>{
      let  filteredPosts = data.posts.filter((post) =>{
           return post._id !== id
       })

       setData({
           posts:filteredPosts,
           viewer:data.viewer
       })
       try{
       const resp = await fetch(API_endpoint + `/deletepost/${id}`, {
           method:"DELETE",
           headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem('jwtoken')
           }
       })

       const respJson = await resp.json()

       
    } catch(err){
        
    }
   }
   if (loading){
    return <Preload h = {"60px"} w = {"60px"} r = {"30px"}/>
   }

    return(
        <>
        <div className="home">
            <div className="homePosts">

                {
                    data.posts.length == 0 ? <Suggestions/> :
                    data.posts.map((post) =>{
                        return(
                            <Postcard
                            post_id = {post._id}
                            deletePost = {() => delete_Post(post._id)}
                            publisherPhoto = {post.postedBy.photo_url}
                            publisher = {post.postedBy.username}
                            viewer = {data.viewer.username}
                            key = {post._id}
                            postId = {post._id}
                            imgSrc = {post.imageurl}
                            caption = {post.caption}
                            likes = {post.likes}
                            liked = {post.likes.includes(data.viewer.id) ? true : false}
                            comments = {post.comments}
                            />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}


export default Home
