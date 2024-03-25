import { useContext, useRef, useState } from "react";
import { userContext } from "../UserContext";
import AddComment from "./AddComment";
import { formatISO9075 } from "date-fns";

export default function CommentList({ postId, comments, author }) {

    const { userInfo } = useContext(userContext);
    const spanRef = useRef(null); 
    const commentsRef = useRef(null); 
    const [show, setShow] = useState(false);

    const handleCommentForm = (ev) => {
        ev.preventDefault();
        setShow(true);
        console.log(spanRef, commentsRef)
        if (spanRef)
            spanRef.current.style.display = 'none'
        if (commentsRef && commentsRef.current)
            commentsRef.current.style.display = 'none'
    }

    return (
        <>
            {comments.length == 0 &&
                <div className="empty-comments" ref={commentsRef}>
                    <h3>No comments Added</h3>
                </div>
            }
            {
                comments.length > 0 && comments.map((comment, index) => {
                    return (
                        <div className="comment-container" key={comment._id}>
                            <div className="comment-header">
                                    <div className="comment-header-right">
                                        <h4>Added by : @{comment.author.username}</h4>
                                        <time>{formatISO9075(new Date(comment.createdAt))}</time>
                                    </div>
                            </div>
                            <div className="comment-body">
                                <p>{comment.content}</p>
                            </div>
                            <hr />
                        </div>
                    )
                })
            }
            {userInfo?.id && userInfo.id !== author &&
                <div className="add-comment-container">
                    <span className="add-btn" ref={spanRef} onClick={handleCommentForm}>
                        Add Comment
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </span>
                    
                </div>
            }
             {
                show && <div><AddComment postId={postId}/></div>
             }
        </>
    )
}