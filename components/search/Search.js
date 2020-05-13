import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { setQueryToUppercase, fetchVolumeData } from '../../helper'
import { UserContext } from '../../helper/UserContext'
import Result from './Result'
import Pagination from './Pagination'
import Loading from '../basics/Loading'

const Search = () => {

    const router = useRouter()
    const [ result, setResult ] = useState({  })
    const [ routerDoesExist, setRouterDoesExist ] = useState(false)

    const [ sortBy, setSortBy ] = useState('relevance')
    const [ query, setQuery ] = useState('')
    const [ startIndex, setStartIndex ] = useState(0)
    const [ maxResult, setMaxResult ] = useState(10)
    const [ currentPage, setCurrentPage ] = useState(1)

    const [ isLoading, setIsLoading ] = useState(false)
    
    useEffect(() => {

        if (router && router.query.q && !routerDoesExist) {
            setRouterDoesExist(true)
            setQuery(router.query.q)
        }

    }, [])

    useEffect(() => {

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
    })

    const fetchDataNeeded = async() => {

        const query = await routerDoesExist && setQueryToUppercase(router.query.q)
        //just some parameters for search query...
        const rsp = await fetchVolumeData(query, sortBy, startIndex, maxResult)
        
        setIsLoading(true)
        await setResult(rsp)
    }

    const paginate = num => {

        setCurrentPage(num)
        const newStartIndex = num * maxResult - maxResult
        setStartIndex(newStartIndex)
        setResult({ })
    }

    return (
        <>
            {
                !isLoading && result.items ? 
                    <>
                        <Result query={router.query.q} items={result.items} />
                        <Pagination paginate={paginate} totalItems={result.totalItems} currentPage={currentPage} maxResult={maxResult} />
                    </>
                     :
                    <Loading />
            }
        </>
    )
}

export default Search
