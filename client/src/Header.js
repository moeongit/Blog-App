import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header(){
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('https://blog-app-backend-one-beige.vercel.app/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout(){
        fetch('https://blog-app-backend-one-beige.vercel.app/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;


    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username && (
                    <>  
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                
            </nav>
      </header>
    );
}