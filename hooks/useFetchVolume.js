import React, { useEffect, useState } from 'react'

export const setQuery = query => {

    const querySplitted = query.split(' ')
    const joinQuery = querySplitted.map(q => q.toUpperCase()).join('_')

    return joinQuery
}

const useFetchVolume = query => {
    
    const [ books, setBooks ] = useState()

    const fetchData = async(query) => {
        const rq = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        const rsp = await rq.ok ? rq.json() : false
        return rsp
    }

    useEffect(() => {
        fetchData(setQuery(query))
            .then(data => {
                if (data) {
                    setBooks(data)
                }
            })
    })

    return books
}

export default useFetchVolume
