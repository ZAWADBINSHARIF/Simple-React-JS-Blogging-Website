import { useState, useEffect } from "react"
import axios from "axios"

const useAxiosFetch = (dataUrl) => {

    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const source = new AbortController()

        const fetchData = async (url) => {
            setIsLoading(true)
            
            try {
                const response = await axios.get(url, { source })
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch (error) {
                if (isMounted) {
                    setData([])
                    setFetchError(error.message)
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchData(dataUrl)

        return () => {
            isMounted = false
            source.abort()
        }
    }, [dataUrl])

    return { data, isLoading, fetchError }

}

export default useAxiosFetch