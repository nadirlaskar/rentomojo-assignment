import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {fetchUserInfo} from "../apis";
const UserProfile = ({ userId }) => {
    const [userInfo, setUserInfo] = useState(false);
    const history = useHistory();
    useEffect(() => {
        fetchUserInfo(userId)
        .then(setUserInfo)
        .catch(err=>{
            console.err(err);
            alert("Unable to fetch user profile");
        });
    }, [userId])
    return userInfo ? <>
        <h4 onClick={history.goBack}>Go Back</h4>
        <a href={`mailto:${userInfo.email}`}>
            <h2>{userInfo.name}</h2>
        </a>

    </> : "Loading User Info";
}
export default UserProfile;