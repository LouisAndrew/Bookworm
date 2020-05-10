import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import styled from 'styled-components'

import Book from '../basics/Book'
import { extract } from '../search/Result'

const BookToRead = ({ book }) => {

    const [ data, setData ] = useState({ })

    useEffect(() => {

        if ( !data.id ) {

            asyncWrapper()
        }
    })
    
    const asyncWrapper = async () => {

        const temp = await fetchBook(book)
        setData(temp)
    }

    const fetchBook = async book => {
        const rq = await fetch(`https://www.googleapis.com/books/v1/volumes/${book}`)
        const rsp = await rq.ok ? rq.json() : false
        return rsp
    }

    const volumeInfo = data.id && extract(data)
    console.log(volumeInfo)

    return (
        <Container>
            { volumeInfo && <Book {...volumeInfo} /> }
        </Container>
    )
}

export default BookToRead

const Container = styled.div`
  
`