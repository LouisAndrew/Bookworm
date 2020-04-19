import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { setQueryToUppercase, fetchVolumeData } from '../helper'

const Search = () => {

    const router = useRouter()
    const [ result, setResult ] = useState({  })
    const [ routerDoesExist, setRouterDoesExist ] = useState(false)
    
    useEffect(() => {
        if (router && router.query && !routerDoesExist) {
            setRouterDoesExist(true)
        }
    })

    const fetchDataNeeded = async() => {

        const query = await routerDoesExist && setQueryToUppercase(router.query.q)
        const rsp = await fetchVolumeData(query)
        
        await setResult(rsp)
    }

    if (routerDoesExist && !result.items) {
        fetchDataNeeded()
    }
    
    console.log(result)

    return (
        <div>
            
        </div>
    )
}

export default Search
