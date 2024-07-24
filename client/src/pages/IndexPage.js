import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetch('https://blog-by-moe-d4da04fb7339.herokuapp.com/post').then(response => {
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