import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import roundClose from '@iconify/icons-ic/round-close'

import Button from '../basics/Button'
import { UserContext } from '../../helper/UserContext'
import { setUserDisplayName } from '../../helper'
import useFeedbackElement from '../../hooks/useFeedbackElement'

const Editable = props => {

    const [ newName, setNewName ] = useState('')
    const { addUser, user } = useContext(UserContext)

    //feedback section
    const [ showFeedback, setShowFeedback ] = useState(false)
    const [ text, setText ] = useState('Display name must not be blank!')
    const [ isAnError, setIsAnError ] = useState(true)
    const feedback = useFeedbackElement(text, isAnError)

    const changeDisplayName = e => {

        e.preventDefault()
        if ( newName === '' ) { 

            setShowFeedback(true)
            return
        } else {
            if ( showFeedback ) setShowFeedback(false)
        }

        setUserDisplayName(newName, user)
            .then(() => {
                
                //TODO error message!
                let updated = user
                updated.displayName = newName
                addUser(updated)

                props.doneUpdating(true)
            })
    }

    const handleName = e => {

        setNewName(e.target.value)
    }

    const close = () => {

        props.doneUpdating(false)
    }

    console.log(feedback)

    return (
        <Container>
            { showFeedback && feedback }
            <Icon onClick={close} className='icon' icon={roundClose} color='white' />
            <Img src={props.photoURL} />
            <div className='inpt'>
                <label for='name'>Display Name:</label>
                <Name onChange={handleName} placeholder={props.displayName} name='name' id='name' />
            </div>
            <Button onClick={changeDisplayName} text='Submit Change' bColor='pink' color='bg' />
        </Container>
    )
}

export default Editable

const Name = styled.input.attrs(props => {
    type: 'text'
})`
    width: 100%;
    
    background: none;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.font};
    
    padding: .5rem 1rem;
    border: none;

    margin-top: 1vh;
`

const Img = styled.img`

    height: 350px;
    width: 350px;
    border-radius: 50%;

    @media screen and ( max-width: 464px ) {

        height: 200px;
        width: 200px;
    }
`

const Container = styled.form`
    
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;

    padding: 5vh;
    background-color: rgba(0, 0, 0, .25);
    border-radius: 15px;

    .inpt {

        margin: 3vh 0;

        label {

            color: #fff;
        }
    }

    .icon {

        position: absolute;
        top: 2vh;
        right: 2vh;

        height: 30px;
        width: 30px;

        &:hover {

            cursor: pointer;
        }
    }

    @media screen and ( orientation: portrait ) {

        width: 60vw;
    }

    @media screen and ( max-width: 464px ) {
        
        width: 80vw;

        .icon {

            height: 30px;
            width: 30px;
        }
    }
`