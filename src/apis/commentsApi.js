
import {POSTS_COMMENTS_API_URL} from "./constants";
export const fetchPostCommentsByPostId = async (postId) => {
    return fetch(`${POSTS_COMMENTS_API_URL}?postId=${postId}`).then(res => res.json())
}