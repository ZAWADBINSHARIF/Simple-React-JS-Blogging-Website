import { useContext, useState } from "react"
import DataContext from "./context/DataContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { format } from 'date-fns'
import api from './api/posts'
import responseError from './api/responseError'

export default function NewPost() {

    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const history = useHistory()
    
    const { posts, setPosts } = useContext(DataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const id = posts.length ? posts[(posts.length - 1)].id + 1 : 1;
        const newPost = {
            id: id,
            title: postTitle,
            datetime: format(new Date(), ' MMM dd, yyy pp'),
            body: postBody
        }

        try {
            const response = await api.post('/posts', newPost)
            setPosts([...posts, response.data])
            setPostTitle('')
            setPostBody('')
            history.push('/')
        } catch (error) {
            responseError(error)
        }
    }


    return (
        <main className="NewPost">
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    value={postTitle}
                    placeholder="Post Title"
                    name="title"
                    required
                    onChange={e => { setPostTitle(e.target.value) }}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    placeholder="Post Body"
                    value={postBody}
                    name="body"
                    required
                    onChange={e => { setPostBody(e.target.value) }}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}