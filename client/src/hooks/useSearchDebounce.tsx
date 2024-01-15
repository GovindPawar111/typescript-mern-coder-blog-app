import { useEffect, useRef, useState } from 'react'

const useSearchDebounce = (query: string, delay = 500) => {
    const [searchQuery, setSearchQuery] = useState<string>('/')
    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setSearchQuery(query)
        }, delay)

        return () => {
            // Cleanup the previous timeout on re-render
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [query, delay])

    return searchQuery
}

export default useSearchDebounce
