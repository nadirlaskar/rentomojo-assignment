import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserProfile from "../../components/UserProfile";
import {fetchPosts} from "../../apis";
const INITIAL_PAGINATION = {
    start: 0,
    count: 4
}
const generatePaginatedPosts = (posts, { start, count }) => {
    return posts.slice(start, start + count).map((post, index) => (<li key={index}>
        <h3>#{post.id} {post.title}</h3>
        {post.details}
    </li>))
}
const transformPosts = (posts) => {
    return posts.map(post => ({
        id: post.id,
        title: post.title,
        details: <Link to={`/post-details/${post.id}`}>read more</Link>
    }))
}
const Pagination = ({ start, end, total, onNext, onPrev }) => {
    return <div>
        <span>
            Showing
            <button disabled={start === 0} onClick={onPrev}>Prev</button>
            {start + 1} to {end}
            <button disabled={(end - start) < total} onClick={onNext}>Next</button></span>
    </div>
}

const updatePagination = (oldPagination, step) => {
    return {
        ...oldPagination,
        start: oldPagination.start + (step * oldPagination.count),
    }
}
const Posts = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(INITIAL_PAGINATION)
    useEffect(() => {
        fetchPosts(userId, pagination.start, pagination.count).then(transformPosts).then(setPosts);
    }, [pagination, userId])
    const postItems = useMemo(() => generatePaginatedPosts(posts, pagination), [pagination, posts])
    return <>
        <UserProfile userId={userId} />
        <Pagination
            total={pagination.count}
            start={pagination.start} end={pagination.start + postItems.length}
            onNext={() => setPagination(updatePagination(pagination, 1))}
            onPrev={() => setPagination(updatePagination(pagination, -1))}
        />
        <h3>All Posts</h3>
        <ul>{postItems}</ul>
    </>
}

export default Posts;