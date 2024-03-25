import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'
import Tag from './Tag'

export default function Post({ post: { _id, title, summary, tags, cover, createdAt, author } }) {
    return (
        <div className="post">
            <div className="post-image">
                <Link to={`/posts/${_id}`}>
                    <img src={`http://localhost:4000/${cover}`} alt='' />
                </Link>
            </div>
            <div className="content">
                <Link to={`/posts/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="post-info">
                    <a className='author'>@{author.username}</a>
                    <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
                {
                    tags?.length > 0 &&
                        tags?.map(tag => <Tag key={tag} name={tag} />)
                }
                <p className="short-desc">{summary}</p>
            </div>
            <hr />
        </div>
    )
}