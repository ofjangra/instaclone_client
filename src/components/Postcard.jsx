import React from "react";

import { Comment} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Postcard = (props) =>{
    return(
        <>
        <div className="homePost">
                    <div className="publisherDetails">
                            <img src = "/img/p0.jpg" alt = "profile photo"/>
                            <strong>kibo</strong>
                    </div>
                    <div className="postImg">
                        <img src = {props.imgSrc}
                            alt = "post"/>
                    </div>
                    <div className="postActions">
                            {/* <FontAwesomeIcon icon={faHeart}/>
                            <FontAwesomeIcon icon={faComment}/> */}
                            <Comment/>
                            <FavoriteBorderIcon/>
                            
                    </div>
                    <span className="likesCount">
                        <strong>45</strong> likes
                    </span>
                    <div className="postDetails">
                        <div className="postBody">
                            <strong>kibo</strong>
                            <p>
                                this is amazing post
                            </p>
                        </div>
                        <div className="postComments">
                            <div className="postComment">
                                
                                <p><strong>Marcus </strong>This is a comment</p>
                            </div>
                            <div className="postComment">
                                
                                <p><strong>Alex </strong>This is the second comment</p>
                            </div>
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