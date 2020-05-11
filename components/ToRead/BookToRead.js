import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import styled from 'styled-components'

import { extract } from '../search/Result'
import Check from '../../assets/sprite_30fps.svg'
import CheckSvg from './CheckSvg'

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

const Book = ({ imgUrl, heading, id, subheading }) => {
    return (
        <BookContainer>
            <Input id={`book-${id}`} />
            <Label for={`book-${id}`}>
                <CheckSvg className='cbox' />
                <img src={imgUrl} />
                <div>
                    <h4>{heading}</h4>
                    <p>{subheading}</p>
                </div>
            </Label>
        </BookContainer>
    )
}

export default BookToRead

const Label = styled.label`
    
    display: flex;
    align-items: center;

    .cbox path {

        transition: .2s;
    }
`

const Input = styled.input.attrs(props => ({
    type: 'checkbox'
}))`
    
    display: none;

    &:not(:checked) + label {
        background-color: pink;

        .cbox path:last-child {

            stroke-dasharray: 16px;
        }
    }

    &:checked + label {

        .cbox path:last-child {

            stroke-dasharray: 0px;
        }
    }
`

const BookContainer = styled.div`

`

const Container = styled.div`
  
`