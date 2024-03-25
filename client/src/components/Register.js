import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        if (response.status === 201) {
            toast.success("User created successfully!")
            navigate("/login");
        }
        else {
            alert("Something went wrong!")
        }
    }
    return (
        <div>
            <form onSubmit={register} className="register">
                <h1>Register</h1>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)} />
                <input type="text" placeholder="email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button>Register</button>
            </form>
        </div>
    )
}