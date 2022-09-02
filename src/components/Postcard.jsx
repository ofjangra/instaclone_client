import React, { useEffect, useState } from "react";

import { Comment} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';


const Postcard = (props) =>{

    
    return(
        <>
        <div className="homePost">
                    <div className="publisherDetails">
                            <img src = {props.publisherPhoto} alt = "profile photo"/>
                            <strong>{props.publisher}</strong>
                          {props.publisher == props.viewer ? <DeleteIcon id = "deleteIcon" onClick = {props.deletePost}/> : null}
                    </div>
                    <div className="postImg">
                        <img src = {props.imgSrc}
                            alt = "post"/>
                    </div>
                    <div className="postActions">
                            <Comment/>
                            <FavoriteBorderIcon/>

                    </div>
                    <span className="likesCount">
                        <strong>45</strong> likes
                    </span>
                    <div className="postDetails">
                        <div className="postBody">
                            <strong>{props.publisher}</strong>
                            <p>
                                {props.caption}
                            </p>
                        </div>
                        <span className="blue-text">view all 54 comments</span>
                        <div className="makeComment">
                            <input type="text"
                            placeholder = "Comment"/>
                            <button>
                                Post
                            </button>
                        </div>


                    </div>
                </div>
        </>
    )
}

export default Postcard
