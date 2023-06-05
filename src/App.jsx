import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Route, Switch } from 'react-router-dom'
import { DataProvider } from './context/DataContext'


export default function App() {

  return (
    <div className='App'>

      <DataProvider>
        <Header title="React Blog" />
        <Nav />

        <Switch>

          <Route exact path="/" component={Home} />

          <Route exact path="/post" component={NewPost} />

          <Route path="/post/:id" component={PostPage} />

          <Route path="/edit/:id" component={EditPost} />

          <Route path="/about" component={About} />
          <Route path='*' component={Missing} />

        </Switch>
      </DataProvider>

      <Footer />

    </div>
  )
}