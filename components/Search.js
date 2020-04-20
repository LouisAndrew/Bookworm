import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { setQueryToUppercase, fetchVolumeData } from '../helper'
import { UserContext } from '../helper/UserContext'

const Search = () => {

    const router = useRouter()
    const [ result, setResult ] = useState({  })
    const [ routerDoesExist, setRouterDoesExist ] = useState(false)
    const { user } = useContext(UserContext)
    
    useEffect(() => {
        if (router && router.query.q && !routerDoesExist) {
            setRouterDoesExist(true)
        }
    })

    console.log(user)

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
