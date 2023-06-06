import { useContext } from "react"
import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import DataContext from "./context/DataContext"
import api from "./api/posts"
import responseError from "./api/responseError"

export default function PostPage() {

    const { posts, setPosts } = useContext(DataContext)
    const history = useHistory()

    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    const handleDelete = async (postID) => {
        try {
            await api.delete(`/posts/${postID}`)
            const newPost = posts.filter(post => post.id !== postID)
            setPosts(newPost)
            history.push('/')
        } catch (error) {
            responseError(error)
        }
    }

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
                    <p>{`Well, that's disappointing.`}</p>
                    <p>
                        <Link to='/'>Go back to the Homepage</Link>
                    </p>
                    </>}
            </article>
        </main>
    )
}