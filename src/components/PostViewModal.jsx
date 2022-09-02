import React from "react";

const PostViewModal = ({postId}) =>{
    const [postData, setPostData] = useState()
    const getPost = async () =>{
        const resp = await fetch("http://localhost:5000/posts/:postid")
    }
}