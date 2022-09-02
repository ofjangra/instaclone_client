import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";


const Signup = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const tokenPresent = localStorage.getItem("jwtoken")
    if(tokenPresent){
        navigate("/")
    }
}, [])

  const signinUser = async (username, password) =>{
    try{
        const resp = await fetch("http://localhost:5000/signin",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
              username,
              password
            }),
        })
        const respJson = await resp.json()
        console.log(respJson)
       if(respJson.token){
           localStorage.setItem("jwtoken", respJson.token)
           navigate("/")
       }
    } catch(err){
        console.log(err)
    }
}

  const signupUser = async () => {
    const { username,phone, password } = formik.values;

    try {
      const signUpResp = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          phone,
          password,
        }),
      });
      const signUpRespJson = await signUpResp.json();

      console.log(signUpRespJson);
      if (signUpRespJson.error){
        alert(signUpRespJson.error)
      }
      else if(signUpRespJson.message){
        await signinUser(username, password)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .required("This field is required")
        .max(16, "Max 16 characters are allowed")
        .min(3, "Minimum 3 characters are required"),
      phone: Yup.string()
        .required("This field is required")
        .max(10, "Maximum 10 digits are allowed")
        .min(8, "Minimum 8 digits are required"),
      password: Yup.string()
        .required("This field is required")
        .max(34, "maximum 34 characters are allowed")
        .min(8, "minimum 8 characters are required"),
    }),


    onSubmit: () => {
      signupUser();
    },
  });
  return (
    <>
      <div className="loginMain">
        <div className="card">
          <h3>Reinstagram</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="inputField">
              <input
                type="text"
                name="username"
                className="input"
                placeholder="Userame"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.username && formik.touched.username ? (
                <p>{formik.errors.username}</p>
              ) : null}
            </div>
            <div className="inputField">
              <input
                type="number"
                name="phone"
                className="input"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <p>{formik.errors.phone}</p>
              ) : null}
            </div>
            <div className="inputField">
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <p>{formik.errors.password}</p>
              ) : null}
            </div>

            <button type="submit">Signup</button>
            <p>Already have an account?</p>
            <Link to="/signin" className="link">
              <strong style={{ color: "rgb(3, 135, 243)" }}>Signin</strong>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
