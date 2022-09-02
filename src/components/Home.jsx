import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Postcard from "./Postcard";
import UserNav from "./UserNav";




const Home = () =>{
    const navigate = useNavigate()
    const [data, setData] = useState({
        posts:[],
        viewer:""
    })

    const fetchUser = async () =>{
        try{
            const tokenPresent = localStorage.getItem("jwtoken")

            if(!tokenPresent){
               return  navigate("/signin")
            }
            const resp = await fetch("http://localhost:5000/allpost",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+tokenPresent
                }
            })

            const respJson = await resp.json();

            console.log(respJson)
            setData(respJson)

            if (respJson.error){

                console.log(respJson.error)
                return navigate("/error")
            }
        } catch(err){
            console.log(err)
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
           posts:filteredPosts
       })
       try{
       const resp = await fetch(`http://localhost:5000/deletepost/${id}`, {
           method:"DELETE",
           headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem('jwtoken')
           }
       })

       const respJson = await resp.json()

       console.log(respJson)
    } catch(err){
        console.log(err)
    }
   }

    return(
        <>
        <UserNav/>
        <div className="home">
            <div className="homePosts">
                {
                    data.posts.map((post) =>{
                      console.log(post)
                        return(
                            <Postcard 
                            deletePost = {() => delete_Post(post._id)}
                            publisherPhoto = {post.postedBy.photo_url}
                            publisher = {post.postedBy.username}
                            viewer = {data.viewer}
                            key = {post._id}
                            postId = {post._id}
                            imgSrc = {post.imageurl}
                            caption = {post.caption}
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
