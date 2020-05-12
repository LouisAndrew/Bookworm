import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Button from '../basics/Button'
import Editable from './Editable'
import useFeedbackElement from '../../hooks/useFeedbackElement'

const Profile = ({ user, loggedInUser }) => {

    const [ updateUser, setUpdateUser ] = useState(false)

    //Feedback section!
    const [ showFeedback, setShowFeedback ] = useState(false)
    const [ text, setText ] = useState('This is not an error!')
    const [ isAnError, setIsAnError ] = useState(true)
    const feedback = useFeedbackElement(text, isAnError)

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
        </Container>
    )
}

export default Profile

const UpdatePage = user => (
    <Popup>
        <Editable {...user} />
    </Popup>
)

const Popup = styled.div`

    height: 100vh;
    width: 100vw;

    background-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
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

    .left {

        padding: 5vh 0;

        display: flex;
        flex-direction: column;
        align-items: center;

        filter: ${props => props.blur && 'blur(5px)'};

        h2 {

            max-width: 200px;
        }

        img {
            height: 250px;
            width: 250px;

            margin: 5vh 0;
            border-radius: 50%;
        }
    }

    @media screen and ( max-width: 840px ) {
        
        flex-direction: column;
        align-items: center;
    }
`