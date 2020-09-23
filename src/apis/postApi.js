import {POSTS_API_URL} from "./constants";
export const fetchPostById = async (postId) => {
    return fetch(`${POSTS_API_URL}/${postId}`).then(res => res.json())
}
export const fetchPosts = async (userId, start, count) => {
    return fetch(`${POSTS_API_URL}?userId=${userId}&skip=${start}&limit=${count}`).then(res => res.json())
}
export const deletePostById = async (postId) => {
    return fetch(`${POSTS_API_URL}/${postId}`,{method:"DELETE"}).then(res => res.json())
}
export default fetchPostById;