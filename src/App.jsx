import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export default function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const history = useHistory()

  useEffect(() => {

    const filteredResults = posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
        || post.body.toLowerCase().includes(search.toLowerCase())
    })

    setSearchResults(filteredResults)

  }, [posts, search]);



  const handleDelete = (postID) => {
    const newPost = posts.filter(post => post.id !== postID)
    setPosts(newPost)
    history.push('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[(posts.length - 1)].id + 1 : 1;
    const newPost = {
      id: id,
      title: postTitle,
      datetime: format(new Date(), ' MMM dd, yyy pp'),
      body: postBody
    }
    setPosts([...posts, newPost])
    setPostTitle('')
    setPostBody('')
    history.push('/')
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

        <Route path="/about" component={About} />
        <Route path='*' component={Missing} />

      </Switch>

      <Footer />
    </div>
  )
}