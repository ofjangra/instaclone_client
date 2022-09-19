import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfilesViewModal from "./ProfilesViewModal";

const API_endpoint = "http://localhost:5000"
const client_endpoint = "http://localhost:5173"

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

    const [commentsExpended, setCommentesExpended] = useState(false)
    
    const viewLikes = (id) =>{
        setOpen(true)
        setApi(API_endpoint + `/posts/likes/${id}`)
    }

    return(
        <>
        
        <div className="homePost">
                    <div className="publisherDetails">
                            <img src = {props.publisherPhoto} alt = "profile photo"/>
                            <a href = {client_endpoint + `/${props.publisher}`} className="link"><strong>{props.publisher}</strong></a>
                          {props.publisher == props.viewer ? <DeleteIcon id = "deleteIcon" onClick = {props.deletePost}  style = {{cursor:"pointer"}}/> : null}
                    </div>
                    <div className="postImg">
                        <img src = {props.imgSrc}
                            alt = "post"/>
                    </div>
                    <div className="postActions">
                    
                            {
                                liked ? <FavoriteBorderIcon onClick = {() => unlikePost(props.post_id)} style = {{color:"red", cursor:"pointer"}}/> : <FavoriteBorderIcon onClick = {() => likePost(props.post_id)}  style = {{cursor:"pointer"}}/>
                            }

                            {
                        likesCount === 0 ?
                            <span className="likesCount">
                            <strong>{likesCount}</strong> likes
                        </span> :
                         <span className="likesCount" onClick = {() => viewLikes(props.post_id)} style = {{cursor:"pointer"}}>
                            <strong>{likesCount}</strong> likes
                        </span>
                    }
                            
                    </div>
                   
                   
                    <div className="postDetails">
                        <div className="postBody">
                        <a href = {client_endpoint + `/${props.publisher}`} className="link"><strong>{props.publisher}</strong></a>
                            <p>
                                {props.caption}
                            </p>
                        </div>
                        {
                            commentCount === 0 ?

                            <p>0 comment</p> :

                        <span style = {{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            cursor:"pointer"
                        }} onClick = {() => setCommentesExpended(!commentsExpended) }>
                            <div style ={{
                                height:"18px",
                                width:"18px",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center"
                            }}>
                                {
                                    commentsExpended ? 
                                    
                                    <KeyboardDoubleArrowUpIcon style = {{fontSize:"16px", color:"rgb(0, 165, 255)"}}/> :

                                    <KeyboardDoubleArrowDownIcon style = {{fontSize:"16px", color:"rgb(0, 165, 255)"}}/>
                                    
                                }
                             
                            </div>
                            <p style = {{opacity:"70%", marginLeft:"5px"}}>view all {commentCount} comments</p>
                        </span>
                        }
                        {
                            commentsExpended ? 
                            <div className="allComments">
                            {
                                props.comments.map((comment) =>{
                                    return(
                                        <div key = {comment._id} style = {{
                                            display:"flex",
                                            height:"20px",
                                            width:"32ch"
                                        }}>
                                            <a href = {client_endpoint + `/${comment.commentedBy}`} className="link">
                                            <strong style = {{marginRight:"10px"}}>{comment.commentedBy}</strong>
                                            </a>
                                            <p>{comment.text}</p>
                                           
                                        </div>
                                    )
                                })
                            }
                            
                        </div> : null
                        }
                      
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
