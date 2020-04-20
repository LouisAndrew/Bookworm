import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { setQueryToUppercase, fetchVolumeData } from '../../helper'
import { UserContext } from '../../helper/UserContext'
import Result from './Result'

const Search = () => {

    const router = useRouter()
    const [ result, setResult ] = useState({  })
    const [ routerDoesExist, setRouterDoesExist ] = useState(false)
    const [ sortBy, setSortBy ] = useState('relevance')
    const [ query, setQuery ] = useState('')
    const [ startIndex, setStartIndex ] = useState(0)
    const [ maxResult, setMaxResult ] = useState(10)
    const { user } = useContext(UserContext)

    const [ isLoading, setIsLoading ] = useState(false)
    
    useEffect(() => {
        if (router && router.query.q && !routerDoesExist) {
            setRouterDoesExist(true)
            setQuery(router.query.q)
        }
    })

    const fetchDataNeeded = async() => {

        const query = await routerDoesExist && setQueryToUppercase(router.query.q)
        //just some parameters for search query...
        const rsp = await fetchVolumeData(query, sortBy, startIndex, maxResult)
        
        setIsLoading(true)
        await setResult(rsp)
    }

    if (routerDoesExist && !result.items) {
        fetchDataNeeded()
    } else {
        if (isLoading) {
            setIsLoading(false)
        }
    }
    
    if (result.items && query !== router.query.q) {
        setResult({ })
        setQuery(router.query.q)
    }

    return (
        <>
            {
                !isLoading && result.items ? 
                    <Result query={router.query.q} items={result.items} /> :
                    <h2>Loading..</h2>
            }
        </>
    )
}

export default Search
