import React from 'react'
import fetch from 'node-fetch'

import Layout from '../../layout'
import BookModel from '../../components/BookModel'

const BookPage = ({ data }) => {
    
    return (
        <Layout>
            <BookModel {...data} />
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
        }
    }
}
