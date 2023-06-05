import Feed from './Feed'
import { useContext } from 'react'
import DataContext from './context/DataContext'

export default function Home() {

    const {searchResults, isLoading, fetchError} = useContext(DataContext)

    return (
        <main className="Home">

            {isLoading && <p className='statusMsg'>Loading Posts...</p>}
            {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
            {!isLoading && !fetchError &&
                (searchResults.length ?
                <Feed posts={searchResults} /> :
                <p style={{ marginTop: '2rem' }}>No post to display</p>)
            }
        </main>
    )
}