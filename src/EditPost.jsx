import { useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import DataContext from "./context/DataContext"

export default function EditPost() {

    const { posts,
        editPostTitle, setEditPostTitle, editPostBody, setEditPostBody,
        handleEdit } = useContext(DataContext)

    const { id } = useParams()
    const post = posts.find(post => post.id.toString() === id)

    useEffect(() => {
        if (post) {
            setEditPostTitle(post.title)
            setEditPostBody(post.body)
        }
    }, [post, setEditPostTitle, setEditPostBody])

    return (
        <main className="NewPost">
            {(editPostTitle && editPostBody) ?
                <>
                    <form className="newPostForm" onSubmit={(e) => {
                        e.preventDefault()
                        handleEdit(post.id)
                    }
                    }>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            type="text"
                            value={editPostTitle}
                            placeholder="Post Title"
                            name="title"
                            required
                            onChange={e => { setEditPostTitle(e.target.value) }}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            placeholder="Post Body"
                            value={editPostBody}
                            name="body"
                            required
                            onChange={e => { setEditPostBody(e.target.value) }}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </> :
                <>
                    <p>{`No post available. You can't edit. Go back to `}
                        <Link to="/">Home page</Link>
                    </p>
                </>
            }
        </main>
    )
}