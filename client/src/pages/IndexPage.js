import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetch('https://blog-by-moe-e1e62091fb57.herokuapp.com/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
            ))}
        </>
    );
}