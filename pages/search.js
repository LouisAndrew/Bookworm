import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '../layout'
import Search from '../components/Search'

const SearchPage = () => {

    const router = useRouter()

    return (
        <Layout>
            <h1>query: {router.query.q} </h1>
            <Search />
        </Layout>
    )
}

export default SearchPage
