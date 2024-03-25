import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../UserContext";
import { toast } from "react-toastify";

export default function AddComment({postId}) {

    const [content, setContent] = useState('')
    const navigate = useNavigate();

    async function addComment(ev) {
        ev.preventDefault();

        const token = localStorage.getItem('token')

        const response = await fetch(`http://localhost:4000/post/${postId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                content: content
            })
        })
        if (response.ok) {
            toast.success("Comment added successfully!")
            navigate(`/posts/${postId}`)
        }
    }

    return (
        <div style={{ margin: '0 auto', alignItems: 'center', display:'inline-flex'}}>
            <form onSubmit={addComment}>
                <textarea placeholder="Add a comment ..."
                    rows='5'
                    cols='35'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" style={{ marginTop: '5px', width: '30%' }}>Add</button>
            </form>
        </div>
    )
}