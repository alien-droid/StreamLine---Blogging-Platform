import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { userContext } from "../UserContext";


function Header() {
    const {userInfo, setUserInfo} = useContext(userContext)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        console.log(token, user);
        if (token) {
            setUserInfo(user);
        }
    }, [])

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUserInfo(null);
        navigate("/")
    }

    const username = userInfo?.username

    return (
        <header>
            <Link to="/" className="logo">StreamLine</Link>
            <nav>
                {
                    username && (
                        <>
                            <span>Welcome, {username}</span>
                            <Link to="/create">Add New Post</Link>
                            <a onClick={logout}>Logout</a>
                        </>
                    )
                }
                {
                    !username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>

                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Header;