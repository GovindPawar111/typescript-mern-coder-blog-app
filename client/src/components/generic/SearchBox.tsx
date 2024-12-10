import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSearchDebounce from '../../hooks/useSearchDebounce'
import SearchIcon from '../../assets/svgs/search.svg?react'
import { AppContext } from '../../context/appContext'

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState<string | null>(null)
    const { setSearch } = useContext(AppContext)
    const debouncedQuery = useSearchDebounce(searchQuery)
    const pathname = useLocation().pathname

    useEffect(() => {
        if (debouncedQuery !== null) {
            setSearch(debouncedQuery)
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
