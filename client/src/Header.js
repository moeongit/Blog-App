import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

const API_URL = process.env.REACT_APP_API_URL;

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const response = await fetch(`${API_URL}/profile`, {
                    credentials: 'include',
                });

                if (response.ok) {
                    const userInfo = await response.json();
                    setUserInfo(userInfo);
                } else {
                    // Handle non-200 responses if needed
                    setUserInfo(null);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setUserInfo(null);
            }
        }

        fetchUserInfo();
    }, [setUserInfo]);

    async function logout() {
        try {
            await fetch(`${API_URL}/logout`, {
                credentials: 'include',
                method: 'POST',
            });
            setUserInfo(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username ? (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
