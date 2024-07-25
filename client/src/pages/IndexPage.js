import Post from "../Post";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/post`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(posts => setPosts(posts))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post._id} {...post} />
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </>
    );
}
