import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../UserContext";
import { toast } from "react-toastify";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const { setUserInfo } = useContext(userContext)

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", data.user)
            setUserInfo(data.user)
            //alert("Login successful !");
            toast.success("Login successful!");
            setRedirect(true);
        }
        else {
            toast.error("Login failed!.. Please try again!")
        }

    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <form onSubmit={login} className="login">
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button>Login</button>
            </form>
        </div>
    )
}