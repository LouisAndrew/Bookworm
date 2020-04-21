import React from 'react'
import fetch from 'node-fetch'

import Layout from '../../layout'

const BookPage = ({ data, bid }) => {

    console.log(data)
    console.log(bid)

    return (
        <Layout>
            
        </Layout>
    )
}

export default BookPage

export const getServerSideProps = async({ params: { bid: bid } }) => {

    const fetchOneVolume = async id => {
        const rq = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        const rsp = await rq.ok ? rq.json() : false
        return rsp
    }

    const data = await fetchOneVolume(bid)

    return {
        props: {
            data,
            bid
        }
    }
}
