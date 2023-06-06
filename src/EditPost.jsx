import { useEffect, useContext, useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import DataContext from "./context/DataContext"
import { format } from "date-fns"
import api from './api/posts'

export default function EditPost() {

    const [editPostTitle, setEditPostTitle] = useState('')
    const [editPostBody, setEditPostBody] = useState('')
    const { posts, setPosts } = useContext(DataContext)

    const history = useHistory()
    const { id } = useParams()
    const post = posts.find(post => post.id.toString() === id)

    useEffect(() => {
        if (post) {
            setEditPostTitle(post.title)
            setEditPostBody(post.body)
        }
    }, [post, setEditPostTitle, setEditPostBody])

    const handleEdit = async (postID) => {
        const updatedPost = {
            id: postID,
            title: editPostTitle,
            datetime: format(new Date(), ' MMM dd, yyy pp'),
            body: editPostBody
        }

        try {
            const response = await api.put(`/posts/${postID}`, updatedPost)
            setPosts(posts.map(post => post.id === postID ? { ...response.data } : post))
            setEditPostTitle('')
            setEditPostBody('')
            history.push('/')
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

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