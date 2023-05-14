import Feed from './Feed'

export default function Home({ posts }) {
    return (
        <main className="Home">
            {posts.length ? 
                <Feed posts={posts} /> :
            <p style={{marginTop:'2rem'}}>No post to display</p>}
        </main>
    )
}