import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import api from '../api/posts'
import responseError from '../api/responseError'

export default function App() {

  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editPostTitle, setEditPostTitle] = useState('')
  const [editPostBody, setEditPostBody] = useState('')
  const history = useHistory()

  useEffect(() => {
    const fetchPost = async () => {

      try {
        const response = await api.get('/posts')
        if (response && response.data) setPosts(response.data)
      } catch (error) {
        responseError(error)
      }

    }

    fetchPost()
  }, [])

  useEffect(() => {

    const filteredResults = posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
        || post.body.toLowerCase().includes(search.toLowerCase())
    })
    setSearchResults(filteredResults)

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
    <div className='App'>
      <Header title="React Blog" />
      <Nav
        search={search}
        setSearch={setSearch}

      />

      <Switch>

        <Route exact path="/">
          <Home
            posts={searchResults}
          />
        </Route>

        <Route exact path="/post">
          <NewPost
            postTitle={postTitle}
            postBody={postBody}
            setPostTitle={setPostTitle}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
        </Route>

        <Route path="/post/:id">
          <PostPage
            posts={posts}
            handleDelete={handleDelete}
          />
        </Route>

        <Route path="/edit/:id" >
          <EditPost
            posts={posts}
            editPostTitle={editPostTitle}
            editPostBody={editPostBody}
            setEditPostTitle={setEditPostTitle}
            setEditPostBody={setEditPostBody}
            handleEdit={handleEdit}
          />
        </Route>

        <Route path="/about" component={About} />
        <Route path='*' component={Missing} />

      </Switch>

      <Footer />
    </div>
  )
}