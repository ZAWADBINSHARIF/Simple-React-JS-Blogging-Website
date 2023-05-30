import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function PostPage({ posts, handleDelete }) {

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={`/edit/${post.id}`}>
                        <button className="editButton">
                            Edit Post
                        </button>
                    </Link>
                        <button className="deleteButton" onClick={()=> handleDelete(post.id)}>
                            Delete
                        </button>
                    </>}
                {!post &&
                    <>
                    <p>Post not found</p>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Go back to the Homepage</Link>
                    </p>
                    </>}
            </article>
        </main>
    )
}