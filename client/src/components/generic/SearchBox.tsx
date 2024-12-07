import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { ErrorType } from '../../types/errorType'
import { getAllSearchedPosts } from '../../api/postApi'
import { AppContext } from '../../context/appContext'
import useSearchDebounce from '../../hooks/useSearchDebounce'
import SearchIcon from '../../assets/svgs/search.svg?react'

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState<string | null>(null)
    const { setPosts } = useContext(AppContext)

    const debouncedQuery = useSearchDebounce(searchQuery)
    const navigate = useNavigate()
    const pathname = useLocation().pathname

    useEffect(() => {
        const getSearchedPost = async (query: string) => {
            try {
                const data = await getAllSearchedPosts(query)
                setPosts(data)
            } catch (e) {
                const error = e as AxiosError<ErrorType>
                console.log(error)
            }
        }
        if (debouncedQuery !== null && debouncedQuery !== '/') {
            getSearchedPost(debouncedQuery)
            navigate(debouncedQuery ? '?search=' + debouncedQuery : '')
        }
    }, [debouncedQuery])

    useEffect(() => {
        // Clear the search query when the user navigates from home page
        setSearchQuery(null)
    }, [pathname])

    return (
        pathname === '/' && (
            <div className="flex justify-center items-center space-x-0 px-4 h-[31px] border border-gray-400 rounded-full w-full">
                <p>
                    <SearchIcon />
                </p>
                <input
                    value={searchQuery || ''}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="outline-none px-3 w-[180px] sm:w-full"
                    type="text"
                    placeholder="Search a post"
                />
            </div>
        )
    )
}

export default SearchBox
