import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'

const API_endpoint = "http://localhost:5000"

const Login = () =>{

    const [error, setError] = useState("")

    const navigate = useNavigate()


    
    useEffect(()=>{
        const tokenPresent = localStorage.getItem("jwtoken")
        if(tokenPresent){
            navigate("/")
        }
    }, [])

   
  


    const signinUser = async (body) =>{
        try{
            const resp = await fetch(API_endpoint+"/user_signin",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(body),
            })
            const respJson = await resp.json()
            if(respJson.error){
                setError(respJson.error)
            }
           if(respJson.token){
               localStorage.setItem("jwtoken", respJson.token)
               navigate("/")
           }
        } catch(err){
           
            
        }
    }

    const formik = useFormik({
        initialValues:{
            username:"",
            password:""
        },
        validationSchema: Yup.object({
            username:Yup.string().matches(/^[a-z0-9_-]{3,16}$/igm, "Invalid username format")
            .required("This field is required"),
            password:Yup.string().required("This field is required").max(34, "maximum 34 characters are allowed").min(8, "minimum 8 characters are required")
        }),
        onSubmit: (values) =>{
            
            signinUser(values)
            //  dispatch(signinUser_Red(values))
             
        }
    })
    return(
        <>
       
        <div className="loginMain">
        <div className = "card">
           
            <h3>Reinstagram</h3>
            <p style = {{margin:"16px 0 16px 0", color:"firebrick"}}>{error}</p>
            <form onSubmit={formik.handleSubmit} method="POST">
            <div className="inputField">
         <input type = "text"
            name="username"
            className="input"
            placeholder="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        /> 
        {formik.errors.username && formik.touched.username ? <p>{formik.errors.username}</p>: null}
    </div> 
    <div className="inputField">
         <input type = "password"
            name="password"
            className="input"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        /> 
        {formik.errors.password && formik.touched.password ? <p>{formik.errors.password}</p>: null}
    </div>      
            
            <button type="submit">
                Login
            </button>
            <p>Do not have an account?</p>
            <Link to ="/accounts/signup" className="link">
                <strong style={{color: "rgb(3, 135, 243)"}}>Signup</strong>
            </Link>
            </form>
           
        </div>

        </div>
        </>
    )
}

export default Login