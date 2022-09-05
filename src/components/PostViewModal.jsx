import React, { useState } from "react";

const PostViewModal = ({ postId }) => {
  const [postData, setPostData] = useState({
    post_photo: "",
    caption: "",
    publisher: {
      profile_photo: "",
      username: "",
    },
    likes: [],
    comments: [],
    viewer: "",
  });

  return (
    <>
      <div className="postViewModal">
        <div className="postContainer">
            <div className="post_photo">
              
            </div>
        </div>
      </div>
    </>
  );
};
