import React, { useEffect, useState } from "react";

import { Comment} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';

import ProfilesViewModal from "./ProfilesViewModal";

const API_endpoint = 'http://localhost:5000'

const Postcard = (props) =>{
    const [likesCount, updateLikesCount] = useState(props.likes.length)
    const [liked, setLiked] = useState(props.liked)
    const [comment, setComment] = useState("")
    const [commentCount, updateCommentCount] = useState(props.comments.length)
    const [open, setOpen] = useState(false)
    const [api, setApi] = useState("")

    const likePost = async (id) =>{
        updateLikesCount(likesCount+1)
        setLiked(!liked)

        await fetch(API_endpoint + `/posts/like/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwtoken')
            }
        })
        
    }
    const unlikePost = async (id) =>{
        updateLikesCount(likesCount-1)
        setLiked(!liked)

        await fetch(API_endpoint + `/posts/unlike/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwtoken')
            }
        })
        
    }

    const postComment = async (id) => {
        setComment("")
        const resp = await fetch(API_endpoint + "/posts/comment", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwtoken')
            },
            body: JSON.stringify({
                comment:comment,
                post_id:id
            })
        })
        
        const respJson = await resp.json()

        if(respJson.message){
            updateCommentCount(commentCount+1)
        }
    }
    
    const viewLikes = (id) =>{
        setOpen(true)
        setApi(`http://localhost:5000/posts/likes/${id}`)
    }


    
    return(
        <>
        
        <div className="homePost">
                    <div className="publisherDetails">
                            <img src = {props.publisherPhoto} alt = "profile photo"/>
                            <strong>{props.publisher}</strong>
                          {props.publisher == props.viewer ? <DeleteIcon id = "deleteIcon" onClick = {props.deletePost}  style = {{cursor:"pointer"}}/> : null}
                    </div>
                    <div className="postImg">
                        <img src = {props.imgSrc}
                            alt = "post"/>
                    </div>
                    <div className="postActions">
                            <Comment  style = {{cursor:"pointer"}}/>
                            {
                                liked ? <FavoriteBorderIcon onClick = {() => unlikePost(props.post_id)} style = {{color:"red", cursor:"pointer"}}/> : <FavoriteBorderIcon onClick = {() => likePost(props.post_id)}  style = {{cursor:"pointer"}}/>
                            }
                            
                    </div>
                    <span className="likesCount" onClick = {() => viewLikes(props.post_id)} style = {{cursor:"pointer"}}>
                        <strong>{likesCount}</strong> likes
                    </span>
                    <div className="postDetails">
                        <div className="postBody">
                            <strong>{props.publisher}</strong>
                            <p>
                                {props.caption}
                            </p>
                        </div>
                        <span>
                            <p style = {{opacity:"70%"}}>view all {commentCount} comments</p>
                        </span>
                        <div className="allComments">
                            {
                                props.comments.map((comment) =>{
                                    return(
                                        <div key = {comment._id} style = {{
                                            display:"flex"
                                        }}>
                                            <strong style = {{marginRight:"10px"}}>{comment.commentedBy}</strong>
                                            <p>{comment.text}</p>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                        <div className="makeComment">
                            <input type="text"
                            placeholder = "Comment"
                            value={comment}
                            name = "comment"
                            onChange={(e) => setComment(e.target.value)}
                            />
                            {comment === "" ? 
                                <button style = {{opacity:"70%"}}>
                                    Post
                                </button>
                                : 
                                <button onClick = {() => postComment(props.post_id)}>
                                    Post
                                </button>}
                           
                        </div>


                    </div>
                </div>
                <ProfilesViewModal isOpen={open} onClose= {() => setOpen(!open)} api = {api} title={'Likes'}/>
        </>
    )
}

export default Postcard
