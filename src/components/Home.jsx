import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Postcard from "./Postcard";
import UserNav from "./UserNav";




const Home = () =>{
    const navigate = useNavigate()

    const fetchUser = async () =>{
        try{
            const tokenPresent = localStorage.getItem("jwtoken")

            if(!tokenPresent){
               return  navigate("/accounts/signin")
            }
            const resp = await fetch("https://reinstagram.herokuapp.com/",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+tokenPresent
                }
            })
    
            const respJson = await resp.json();

            console.log(respJson)
    
            if (respJson.error){
                
                console.log(respJson.error)
                return navigate("accounts/signin")
            }
        } catch(err){
            console.log(err)
        }
    }

   useEffect(()=>{
       fetchUser()
   },[])

    return(
        <>
        <UserNav/>
        <div className="home">
            <div className="homePosts">
                <Postcard
                imgSrc = "/img/p1.jpg"
                />
                 <Postcard
                 imgSrc = "/img/p0.jpg"
                 /> 
                 <Postcard
                 imgSrc = "/img/p2.jpg"
                 /> 
                 <Postcard
                 imgSrc = "/img/p4.jpg"
                 />
            </div>
        </div>
        </>
    )
}


export default Home