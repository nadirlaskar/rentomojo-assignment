import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserProfile from "../../components/UserProfile";
import Comments from '../../components/comments';
import { fetchPostById, deletePostById } from "../../apis";

const PostDetails = () => {
    const { postId } = useParams();
    const [isDeletingPost, setDeletingFlag] = useState(false);
    const [postInfo, setPostDetails] = useState(false);
    const history = useHistory();
    useEffect(() => {
        fetchPostById(postId)
            .then(setPostDetails)
            .catch(err => {
                console.err(err);
                alert("Unable to fetch post");
            });
    }, [postId])
    const deletePost = useCallback(() => {
        setDeletingFlag(true);
        deletePostById(postId)
            .then(() => {
                history.push(`/posts/${postInfo.userId}`)
            })
            .catch(err => {
                console.err(err);
                alert("Unable to delete post");
                setDeletingFlag(false);
            });
    }, [postId, history, postInfo])
    return postInfo ? <>
        <UserProfile userId={postInfo.userId} />
        <div>
            #{postId} Post details <button disabled={isDeletingPost} onClick={deletePost}>Delete</button>
            <h2>{postInfo.title}</h2>
            <p>{postInfo.body}</p>
        </div>
        <Comments postId={postId} />
    </> : "Loading post details";
}
export default PostDetails;