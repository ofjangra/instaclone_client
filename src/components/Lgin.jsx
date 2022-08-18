import React, { useState } from "react";


const Lgin = () =>{

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const postData = async (e) =>{
        e.preventDefault()
        try{
            const resp = await fetch("http://localhost:5000/signin",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    username:name,
                    password:password
                }),
            
            })
            const respJson = await resp.json()
            console.log(respJson)
            if(respJson.token){
                navigate("/")
            }
        } catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <form>

       
        <input type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder= "name"/>
        <br/>
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder= "password"/>
        <br/>
        <button type="submit" onClick={postData}>Submit</button>
        </form>
        
        </>
    )
}

export default Lgin