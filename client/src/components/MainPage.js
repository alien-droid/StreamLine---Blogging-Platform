import { useEffect, useState } from "react";
import Post from "./Post";

export default function MainPage() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('http://localhost:4000/posts')
            const data = await response.json()
            console.log(data)
            setPosts(data)
        }
        fetchPosts()
    }, [])

    return (
        <>
            {posts.length > 0 && posts.map(post =>
                <Post key={post._id} post={post}/>
            )}
        </>
    )
}