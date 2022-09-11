import React, {useEffect, useState} from  'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Profile from './Profile'

const User = () =>{
    const params = useParams()
    const {username} = params
    const [error, setError] = useState(null)
    const [data, setData] = useState({
        user_props:{},
        userDetails:{},
        posts:[],
    })
    const navigate = useNavigate()
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
            return setError(respJson.error)
        }
        setData({
            user_props:respJson.user_props,
            userDetails:respJson.userDetails,
            posts:respJson.posts,
        })
    
    } catch(err){
        navigate('/error')
        console.log(err)
    }
    }

    useEffect(() =>{
        getUser()
    },[params])
   
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
    } if(data.user_props.viewerID === data.userDetails._id) {
            return(
                    <Profile userDetails={data.userDetails} posts = {data.posts} owner = {true}/>
                  )
            }
    else{
        return <Profile userDetails={data.userDetails} posts = {data.posts} owner = {false}/>
    }

       
    
}

export default User