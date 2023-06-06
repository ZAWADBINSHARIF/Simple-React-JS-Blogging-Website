import { createContext, useState, useEffect } from "react"
import propTypes from 'prop-types'
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState('')
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

    return (
        <DataContext.Provider value={{
            posts, setPosts,
            search, setSearch, searchResults,
            isLoading, fetchError
        }}>
            {children}
        </DataContext.Provider>
    )
}


DataProvider.propTypes = {
    children: propTypes.array
}


export default DataContext