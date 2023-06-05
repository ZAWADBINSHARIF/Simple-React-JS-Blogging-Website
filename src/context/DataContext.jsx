import { createContext, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import api from '../api/posts'
import responseError from '../api/responseError'
import useWindowSize from '../hooks/useWindowsSize'
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editPostTitle, setEditPostTitle] = useState('')
    const [editPostBody, setEditPostBody] = useState('')
    const history = useHistory()
    const { width } = useWindowSize()
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3000/posts')

    useEffect(() => {
        setPosts(data)
    }, [data])

    useEffect(() => {

        const filteredResults = posts.filter(post => {
            return post.title.toLowerCase().includes(search.toLowerCase())
                || post.body.toLowerCase().includes(search.toLowerCase())
        })
        setSearchResults(filteredResults.reverse())

    }, [posts, search]);

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
        <DataContext.Provider value={{
            width,
            search, setSearch, searchResults,
            isLoading, fetchError,
            posts, postTitle, postBody, setPostTitle, setPostBody,
            editPostTitle, setEditPostTitle, editPostBody, setEditPostBody,
            handleSubmit, handleDelete, handleEdit
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext