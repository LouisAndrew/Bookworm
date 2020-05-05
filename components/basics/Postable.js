import React, { useRef, useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from '@iconify/react'
import bxsSearchAlt2 from '@iconify/icons-bx/bxs-search-alt-2'
import roundClose from '@iconify/icons-ic/round-close'

import Button from './Button'
import { fetchVolumeData, setQueryToUppercase, submitRev } from '../../helper'
import Book from './Book'
import { extract } from '../search/Result'
import { UserContext } from '../../helper/UserContext'

const Postable = ({ rerender }) => {

    const searchRef = useRef()
    const textRef = useRef()
    const [ book, setBook ] = useState({ })
    // const [ bookName, setBookName ] = useState('')
    const [ bookList, setBookList ] = useState([ ])
    const ctx = useContext(UserContext)

    // const fetchDataNeeded = async bookName => {

    //     console.log(bookName)
    //     const rq = await fetchVolumeData(bookName, 'relevance', 0, 10)
    //     return rq
    // }

    const resizeTextArea = e => {

        const el = e.target
        el.style.height = '10px'
        e.target.style.height = `${e.target.scrollHeight}px`
   }

    const searchBook = async e => {

        e.preventDefault()
        const data = await fetchVolumeData( setQueryToUppercase(searchRef.current.value), 'relevance', 0, 5 )
        data && setBookList(data.items)
    }

    const focusOnBook = id => {

        const data = bookList.filter(item => item.id === id)[0]
        setBook( data )
        console.log(book)
        setBookList([ ])
    }

    const removeFocus = () => {

        setBook({ })
    }

    const post = () => {

        const user = ctx.user
        const rev = textRef.current.value
        const bookId = book.id
        const title = book.volumeInfo.title

        submitRev(user, rev, bookId, title)

        setBook({ })
        textRef.current.value = ''
        rerender()
    }

    const clickPost = () => {

        if ( book.volumeInfo ) {
            post()
        }
    }

    const form = <>
                    <Icon className='icon' icon={bxsSearchAlt2} />
                    <form onSubmit={searchBook}>
                        <Mention ref={searchRef} />
                    </form>
                 </>

    const bookFocuse = book.volumeInfo &&  <FocusBook>
                                        <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail} />
                                        <div className='divider'>
                                            <h5>{book.volumeInfo.title ? book.volumeInfo.title: undefinedItem} </h5>
                                            <h6>{book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'undefined'}</h6>
                                        </div>
                                        <Icon onClick={removeFocus} className='icon' icon={roundClose} />
                                      </FocusBook>

    console.log(book)

    return (
        <Container>
            <Textarea onChange={resizeTextArea} ref={textRef} />
            <div className='upper'>
                { !book.volumeInfo ? form : bookFocuse}
                <Button onClick={clickPost} text='Post a review!' color='white' bColor='pink' />
            </div>
            { bookList && <BookResultQuick focusOnBook={focusOnBook} bookList={bookList} /> }
        </Container>
    )
}

const BookResultQuick = ({ bookList, focusOnBook }) => {

    const list = bookList.filter((item, index) => index < 5)

    useEffect(() => {

        setTimeout(() => {
            document.getElementById('book-cont-main').classList.add('rendered')
        }, 0)
        
        return () => {

            document.getElementById('book-cont-main').classList.remove('rendered')
        }
    })

    const clickBook = id => {

        focusOnBook(id)
    }

    return (
        <BookContainer id='book-cont-main'>
        {
            list && list.map(x => <Book click={clickBook} {...extract(x)}/>)
        }
        </BookContainer>
    )
}

export default Postable

const FocusBook = styled.div`

    display: flex;
    align-items: center;
    padding: 5%;
    border-radius: 15px;

    position: relative;
    width: 60%;

    background-color: ${({ theme }) => theme.fg};
    box-shadow: ${({ theme }) => theme.shadow};

    img {
        height: 50px;
    }

    div {

        width: 80%;
        margin: 0 5%;
        line-height: 1.2rem;
    }

    .icon {

        height: 25px;
        width: 25px;
        position: absolute;
        right: 5%;
    }
`

const BookContainer = styled.div`
    
    display: flex;
    flex-direction: column;

    max-height: 0;
    overflow: hidden;
    transition: .5s;

    .book-cont {

        margin: 1vh 0 !important;

        img {

            height: 60px !important;
        }

        .divider {

            line-height: normal !important;

            h2 {
                font-size: 1rem !important;
            }

            h3 {

                font-size: .8rem !important;
            }
        }

        img {

            height: 100%;
        }
    }

    &.rendered {

        max-height: 100vh;
    }
`

const Mention = styled.input.attrs(props => ({
    type: 'text',
    placeholder: 'mention a book here'
}))`
    width: 100%;

    background: none;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.fg};
    color: ${({ theme }) => theme.font};
    border-bottom: 2px solid ${({ theme }) => theme.pink};

    padding: .5rem 1rem;
    padding-left: calc( 1rem + 20px );
`

const Textarea = styled.textarea`

    width: 100%;
    min-height: 15vh;

    border: none;
    outline: none;
    padding: 1rem;

    background-color: ${({ theme }) => theme.fg};
    color: ${({ theme }) => theme.font};
`

const Container = styled.div`
    
    width: 100%;
    padding: 2% 5%;

    background-color: ${({ theme }) => theme.fg};
    border-radius: 15px;

    box-shadow: ${({ theme }) => theme.shadow};

    .upper {

        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        position: relative;

        form {

            width: 60%;
        }

        .button {

            width: 30%;
        }

        .icon {

            height: 20px;
            width: 20px;
            position: absolute;
        }
    }
` 