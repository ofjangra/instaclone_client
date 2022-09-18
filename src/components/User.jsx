import React, {useEffect, useState} from  'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Preload from './Preload'
import Profile from './Profile'

const User = () =>{
    const API_endpoint = "http://localhost:5000"
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const {username} = params
    const [error, setError] = useState(null)
    const [following, setFollowing] = useState(false)
    const [followersCount, setFollowersCount] = useState(0)
    const [data, setData] = useState({
        user_props:{
            loggedIn:null,
            viewerID:""
        },
        userDetails:{
            userId:"",
            bio:"",
            followingsCount: "",
            name:"",
            photo_url:"",
            username:"",
            website:""
        },
        posts:[],
    })
    
    const navigate = useNavigate()
    useEffect(() =>{
        getUser()
    },[params])

    const getUser = async() =>{

        const headers = {
            "Content-Type":"application/json",
        }

        const tokenPresent = localStorage.getItem('jwtoken')
        tokenPresent ? headers.Authorization = "Bearer "+tokenPresent : null

        try{

        const resp = await fetch(`http://localhost:5000/users/${username}`, {
        method:"GET" ,
        headers:headers

        })

        const respJson = await resp.json()
        console.log(respJson)

        if(respJson.error){
            setLoading(false)
            return setError(respJson.error)
        }

        setData({
            user_props:{
                loggedIn:respJson.user_props.loggedIn,
                viewerID:respJson.user_props.viewerID,
            },
            userDetails:{
                userId: respJson.userDetails._id,
                bio:respJson.userDetails.bio,
                followingsCount:respJson.userDetails.followings.length,
                name:respJson.userDetails.name,
                photo_url:respJson.userDetails.photo_url,
                username:respJson.userDetails.username,
                website:respJson.userDetails.website
            },
            posts:respJson.posts,
        })
        setFollowing(respJson.userDetails.followers.includes(respJson.user_props.viewerID))
        setFollowersCount(respJson.userDetails.followers.length)
        setLoading(false)

    
    
    } catch(err){
        navigate('/error')
        console.log(err)
        setError(respJson.error)
    }
    
    }

    const follow_user = async (id) =>{
            setFollowersCount(followersCount+1)
            setFollowing(!following)
            try{
            
            const resp = await fetch(API_endpoint + "/follow_user", {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem('jwtoken')
                }, 
                body: JSON.stringify({
                    followee_id:id
                })
            })
            const respJson = await resp.json()
            console.log(respJson)
            
            } catch(err){
                console.log(err)
            }
        }

        const unfollow_user = async (id) =>{
        setFollowersCount(followersCount-1)
        setFollowing(!following)
        try{

        
        const resp = await fetch(API_endpoint + "/unfollow_user", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('jwtoken')
            }, 
            body: JSON.stringify({
                followee_id:id
            })
        })
        const respJson = await resp.json()
        console.log(respJson)
        
        } catch(err){
            console.log(err)
        }
    }

    if(loading){
        return <Preload h = {"60px"} w = {"60px"} r = {"30px"}/>
    }
   
    if(error){
        return (
            <div style = {{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"space-around",
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%, -50%)"
            }}>
                <h1>User not Found</h1> 
                <Link to = "/" className='link'>
                    <strong style = {{color:"rgb(0, 165, 255)", marginTop:"30px"}}>Back to Home</strong>
                </Link>
            </div>
        )
    } 
        return(
                <Profile
                userDetails={data.userDetails}
                followersCount = {followersCount}
                posts = {data.posts} 
                owner = {data.user_props.viewerID === data.userDetails.userId}
                following = { !data.user_props.loggedIn ? false : following}
                follow = {() =>follow_user(data.userDetails.userId)}
                unfollow = {() =>unfollow_user(data.userDetails.userId)}
                
                />
        ) 
    

       
    
}

export default User