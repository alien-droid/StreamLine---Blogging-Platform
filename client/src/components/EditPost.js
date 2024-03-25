import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";

export default function EditPost() {

    const tagsOptions = [
        { label: "AI✨", value: "AI" },
        { label: "Venture🧑‍💼", value: "Venture" },
        { label: "Security🔒", value: "Security" },
        { label: "Crypto🔑", value: "Crypto" },
        { label: "Apps📲", value: "Apps" },
        { label: "Events🎉", value: "Events" },
        { label: "Finance💵", value: "Finance" },
        { label: "Marketing📑", value: "Marketing" },
        { label: "Games🎱", value: "Games" },
    ]

    const { postId } = useParams();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [imgFiles, setImgFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchPost() {
            const response = await fetch(`http://localhost:4000/post/${postId}`);
            const post = await response.json();
            setTitle(post.title);
            setSummary(post.summary);
            setContent(post.content);
            const tagsArr = post.tags.map(tag => {
                const label = tagsOptions.find(t => t.value === tag).label
                return { label, value: tag }
            });
            setTags(tagsArr);
        }
        fetchPost();
    }, [])

    async function updatePost(ev) {

        const token = localStorage.getItem('token')

        const data = new FormData()
        data.set('title', title)
        data.set('content', content)
        data.set('summary', summary)
        if (imgFiles?.[0]) {
            data.set('file', imgFiles?.[0])
        }
        if (tags.length > 0) {
            const tagsArr = tags.map(t => t.value)
            data.set('tags', JSON.stringify(tagsArr))
        }

        ev.preventDefault();
        const response = await fetch(`http://localhost:4000/post/${postId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        })
        if (response.ok) {
            toast.success("Post updated successfully")
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={`/posts/${postId}`} />
    }

    return (
        <div>
            <form onSubmit={updatePost}>
                <input type="text"
                    placeholder="Title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <input type="summary"
                    placeholder="Summary (A short description for the post ..)"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)} />
                <input
                    type="file"
                    placeholder="An Image for your content-post"
                    onChange={ev => setImgFiles(ev.target.files)} />

                <label>Tags :</label>
                <div style={{ width: '10%', marginBottom: '10px' }}>
                    {tags.length > 0 && <pre>{JSON.stringify(tags.map(t => t.label))}</pre>}
                    <MultiSelect
                        options={tagsOptions}
                        value={tags}
                        onChange={setTags}
                        isSearchable={true}
                        labelledBy="Select"
                        hasSelectAll={false}
                    />
                </div>
                <Editor onChange={setContent} value={content} />

                <button type='submit' style={{ marginTop: '5px' }}>Update Post</button>
            </form>
        </div>
    )
}