import React, { useState, useEffect, useContext } from 'react'
import fetch from 'node-fetch'
import styled from 'styled-components'

import { extract } from '../search/Result'
import { updateBookListFirestore } from '../../helper/index'
import CheckSvg from './CheckSvg'
import { UserContext } from '../../helper/UserContext'
import Postable from '../basics/Postable'

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

    return (
        <Container>
            { volumeInfo && <Book specific={data} {...volumeInfo} /> }
        </Container>
    )
}

const Book = ({ imgUrl, heading, id, subheading, specific }) => {

    const [ isRead, setIsRead ] = useState(false)
    const { updateBookList, user, bookList } = useContext(UserContext)

    const clickBook = () => {

        const statement = !isRead
        setIsRead(statement)
        //if is Read is true => then the statement 'isAdding' on those methods below would be false
        updateBookList(id, !statement)
        updateBookListFirestore(id, user, !statement)

        if ( statement ) {

            document.getElementById(`toread-${id}`).classList.add('doneRead')
        } else {

            const elClass = document.getElementById(`toread-${id}`).classList
            elClass.contains('doneRead') && elClass.remove('doneRead')
        }
    }

    return (
        <BookContainer $id={id}>
            <Input onChange={clickBook} id={`book-${id}`} />
            <Label for={`book-${id}`}>
                <CheckSvg isRead={isRead} className='cbox' />
                <img src={imgUrl} />
                <div>
                    <h4>{heading}</h4>
                    <p>{subheading}</p>
                </div>
            </Label>
            <Postable id={`toread-${id}`} specificBook={specific} />
        </BookContainer>
    )
}

export default BookToRead

const Label = styled.label`
    
    width: 100%;
    display: flex;
    align-items: center;

    img {

        margin: 5%;
    }

    &:hover {

        cursor: pointer;
    }

    @media screen and ( max-width: 464px ) {
            
        img {

            margin: 0;
            width: 25%;
            padding: 5%;
        }

        .cbox {

            height: 20px;
            width: 20px;
        }
    }
`

const Input = styled.input.attrs(props => ({
    type: 'checkbox'
}))`
    
    display: none;
`

const BookContainer = styled.div`

    width: 100%;

    #toread-${props => props.$id} {

        width: 50%;
        max-height: 0;

        overflow: hidden;
        padding: 0 !important;
        transition: .2s;

        button {

            width: 100%;
            margin-top: 5%;
        }

        &.doneRead {

            max-height: 100vh;
            padding: 2% 5%;
        }

        @media screen and ( max-width: 850px ) {
            
            width: 100%;
        }
    }
`

const Container = styled.div`
  
`