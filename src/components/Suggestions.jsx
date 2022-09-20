import React, {useEffect, useState} from 'react'


const API_endpoint = "http://localhost:5000"
const client_endpoint = "http://localhost:5173"



const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([])

    const getSuggestions = async () =>{
        const resp = await fetch(API_endpoint + "/suggestions", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwtoken')
            }
        })
        const respJson = await resp.json()
        setSuggestions(respJson)
    }

    
    useEffect(() =>{
        getSuggestions()
    },[])

    return(
        <>
            <div className='suggestions' style = {{height:"480px", width:"320px", display:"flex", flexDirection:"column", alignItems:"center", overflow:"scroll"}}>
                <div style = {{height:"30px", width:"100%", borderBottom:"1px solid gray", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <strong>Suggestions</strong>
                </div>
                {
                    suggestions.map((user) =>{
                        return(
                            <div style = {{height:"auto", width:"90%", display:"flex", alignItems:"center", padding:"15px 0 15px 0", borderBottom:"1px solid gray"}} key = {user._id}>
                                
                                <div style={{height:"40px", width:"40px", borderRadius:"20px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                    <img src={user.photo_url} style ={{height:"40px", width:"auto", borderRadius:"20px", objectFit:"cover"}} alt = "photo"></img>
                                </div>
                                <a href = {client_endpoint + `/${user.username}`} className = "link">
                                <strong style = {{marginLeft:"40px"}}>{user.username}</strong>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Suggestions