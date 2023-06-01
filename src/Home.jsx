import Feed from './Feed'

export default function Home({ posts, isLoading, fetchError }) {
    return (
        <main className="Home">

            {isLoading && <p className='statusMsg'>Loading Posts...</p>}
            {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
            {!isLoading && !fetchError &&
                (posts.length ?
                <Feed posts={posts} /> :
                <p style={{ marginTop: '2rem' }}>No post to display</p>)
            }
        </main>
    )
}