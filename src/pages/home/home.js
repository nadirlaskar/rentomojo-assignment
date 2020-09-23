import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {fetchUsers} from "../../apis";
import "./home.css";

const TABLE_HEADERS = ["Name", "Company", "Blog posts"];
const generateTable = (items) => {
    return items.map((item, index) => {
        let values = Object.values(item).map((value, index) => <td key={index}>{value}</td>);
        return <tr key={index}>{values}</tr>
    })
}

const transformUserResponse = (users) => {
    let transformedResponse = users.map(user => ({
        name: user.name,
        company: user.company.name,
        blog: <Link to={`/posts/${user.id}`}>View Posts</Link>
    }))
    return transformedResponse;
}

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers().then(transformUserResponse).then(setUsers).catch(err=>{
            console.err(err);
            alert("Unable to fetch users");
        })
    }, [])
    const userRows = useMemo(() => generateTable(users), [users]);
    return <>
        <h2>Users Table</h2>
        <table>
            <thead>
                <tr>
                    {TABLE_HEADERS.map((header,index) => <td key={index}>{header}</td>)}
                </tr>
            </thead>
            <tbody>{userRows}</tbody>
        </table>
    </>
}

export default Home;