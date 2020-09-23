import {USER_API_URL} from "./constants";
export const fetchUsers = async () => {
    return fetch(USER_API_URL).then(res => res.json())
}
export const fetchUserInfo = async (userId) => {
    return fetch(`${USER_API_URL}/${userId}`).then(res => res.json())
}
export default fetchUsers;