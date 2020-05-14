import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Button from '../basics/Button'
import Editable from './Editable'
import useFeedbackElement from '../../hooks/useFeedbackElement'
import useUserBookList from '../../hooks/useUserBookList'
import { extract } from '../search/Result'

const Profile = ({ user, loggedInUser }) => {

    const [ updateUser, setUpdateUser ] = useState(false)

    //Feedback section!
    const [ showFeedback, setShowFeedback ] = useState(false)
    const [ text, setText ] = useState('This is not an error!')
    const [ isAnError, setIsAnError ] = useState(true)
    const feedback = useFeedbackElement(text, isAnError)

    const bookList = useUserBookList(user.uid)

    const onClick = () => {

        setUpdateUser(true)
    }

    const doneUpdating = done => {

        setShowFeedback(true)
        if ( done ) {

            setText('Updated display name')
            setIsAnError(false)
        } else {

            setText('Display name is not updated')
            setIsAnError(true)
        }

        setUpdateUser(false)
    }

    useEffect(() => {

        if ( showFeedback ) {

            setTimeout(() => {

                setShowFeedback(false)
            }, 1500)
        }
    })

    return (
        <Container blur={updateUser} className='wrap'>
            { showFeedback && feedback }
            { updateUser && <UpdatePage doneUpdating={doneUpdating} {...user} /> }
            <div className='left'>
                <h2> {user.displayName} </h2>
                <img src={user.photoURL} />
                { loggedInUser && <Button onClick={onClick} color={'#fff'} bColor='pink' text='Update your Profile' /> }
            </div>
            <div className='right'>
                <h3>{ loggedInUser ? 'Your to-read list:' : `${user.displayName}'s to-read list:` }</h3>
                {
                    bookList && bookList.map((book, i) => <Book index={i} book={book} />)
                }
            </div>
        </Container>
    )
}

const UpdatePage = user => (
    <Popup>
        <Editable {...user} />
    </Popup>
)

const Book = ({ book, index }) => {

    const [ data, setData ] = useState({ })
    const router = useRouter()

    const asyncWrapper = async book => {

        const temp = await fetchBook(book)
        setData(temp)
    }

    const fetchBook = async book => {
        const rq = await fetch(`https://www.googleapis.com/books/v1/volumes/${book}`)
        const rsp = await rq.ok ? rq.json() : false
        return rsp
    }

    const clickBook = () => {

        router && router.push('/books/[bid]', `/books/${book}`)
    }

    useState(() => {

        !data.id && asyncWrapper(book)
    })

    const volumeInfo = data.id && extract(data)

    console.log(volumeInfo)

    return (
        <BookContainer>
            { volumeInfo && <>
                                <img src={volumeInfo.imgUrl} />
                                <div className='det'>
                                    <h4 onClick={clickBook}>{(index + 1)}. {volumeInfo.heading}</h4>
                                    <h5>{volumeInfo.subheading}</h5>
                                </div>
                            </>        
             }
        </BookContainer>
    )
}

export default Profile

const BookContainer = styled.div`
    
    display: flex;
    align-items: center;

    padding: 5%;
    padding-left: 0;

    img {

        margin-right: 5%;
        width: 20%;
    }

    .det {

        h4 {

            margin-bottom: .5rem;

            &:hover {

                cursor: pointer;
            }
        }
    }

    @media screen and ( max-width: 840px ) {

        padding-left: 5%;
        
        img {

            width: 20%;
            margin-right: 10%;
        }
    }
`

const Popup = styled.div`

    height: 100%;
    width: 100vw;

    background-color: rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
/* 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */

    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`

    display: flex;
    width: 100%;

    /* #el {

        width: fit-content !important;
        height: fit-content !important;
    } */

    .left {

        display: flex;
        flex-direction: column;
        align-items: center;

        width: 50%;
        padding: 5vh 0;

        filter: ${props => props.blur && 'blur(5px)'};

        img {
            height: 250px;
            width: 250px;

            margin: 5vh 0;
            border-radius: 50%;
        }

        h2 {

            max-width: 200px;
        }
    }

    .right {

        padding-left: 10%;

        width: 50%;
        padding: 5vh 0;

        @media screen and ( max-width: 840px ){
            
            width: 100%;
            padding-left: 0;

            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    @media screen and ( max-width: 840px ) {
        
        flex-direction: column;
        align-items: center;
    }
`