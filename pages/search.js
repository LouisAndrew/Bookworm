import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '../layout'
import useFetchVolume from '../hooks/useFetchVolume'

const SearchPage = () => {

    const router = useRouter()
    // const [ result, setResult ] = useState(useFetchVolume(router.query.q))

    console.log(router.query.q)

    return (
        <Layout>
            <h1>query: {router.query.q} </h1>
        </Layout>
    )
}

export default SearchPage
