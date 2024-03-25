import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { userContext } from "../UserContext";
import CommentList from "./CommentList";
import Tag from "./Tag";

export default function PostPage() {

    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(userContext)

    useEffect(() => {
        fetch(`http://localhost:4000/post/${postId}`)
            .then(res => {
                res.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, [])

    if (!postInfo) {
        return ''
    }

    return (
        <div>
            <div className="post-page">
                <h1>{postInfo.title}</h1>
                <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                <div className="author">Written By : @{postInfo.author.username}</div>
                {
                    postInfo.tags?.length > 0 &&
                    <div className="tag-container">
                        {postInfo.tags.map(tag => <Tag key={tag} name={tag} />)}
                    </div>
                }
                {userInfo?.id === postInfo.author._id &&
                    (
                        <div className="edit-container">
                            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                Edit!
                            </Link>
                        </div>
                    )
                }
                <div className="image">
                    <img src={`http://localhost:4000/${postInfo.cover}`} alt=""></img>
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
            </div>
            <hr />
            <CommentList postId={postId} comments={postInfo.comments} author={postInfo.author._id} />
        </div>
    )
}