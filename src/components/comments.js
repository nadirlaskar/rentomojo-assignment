
import React, { useCallback, useMemo, useState } from "react";
import "./comments.css";
import { fetchPostCommentsByPostId } from "../apis"
const getCommentList = (comments) => {
    if (!comments) return null;
    return comments.map((comment, index) => {
        return <div key={index} class="comment-wrapper">
            <a href={`mailto:${comment.email}`}><div class="user-email">{comment.email}</div></a>
            <p>{comment.body}</p>
        </div>
    })
}
const Comments = ({ postId }) => {
    const [comments, setComments] = useState(false);
    const loadComments = useCallback(() => {
        fetchPostCommentsByPostId(postId)
            .then(setComments)
            .catch(err => {
                console.err(err);
                alert("Unable to fetch comments");
            })
    }, [postId])
    const commentList = useMemo(() => getCommentList(comments), [comments])
    return <section class="comment-section">
        {comments ? commentList : <button onClick={loadComments}>Show comments</button>}
    </section>
}
export default Comments;