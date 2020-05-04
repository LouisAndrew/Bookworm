import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import Button from '../basics/Button'
import { UserContext } from '../../helper/UserContext'
import { setUserDisplayName } from '../../helper'

const Editable = props => {

    console.log(props)

    const [ newName, setNewName ] = useState('')
    const { addUser, user } = useContext(UserContext)

    const changeDisplayName = e => {

        e.preventDefault()
        setUserDisplayName(newName, user)
            .then(() => {
                
                console.log('done')
                let updated = user
                updated.displayName = newName
                addUser(updated)

                props.doneUpdating()
            })
    }

    const handleName = e => {

        setNewName(e.target.value)
    }

    return (
        <Container>
            <Img src={props.photoURL} />
            <div className='inpt'>
                <label for='name'>Display Name:</label>
                <Name onChange={handleName} placeholder={props.displayName} name='name' id='name' />
            </div>
            <Button onClick={changeDisplayName} text='Submit Change' bColor='pink' color='#fff' />
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
    
    padding: .5rem 1rem;
    border: none;

    margin-top: 1vh;
`

const Img = styled.img`

    height: 350px;
    width: 350px;
    border-radius: 50%;
`

const Container = styled.form`
    
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 30vw;

    padding: 5vh;
    background-color: rgba(0, 0, 0, .25);
    border-radius: 15px;

    .inpt {

        margin: 3vh 0;

        label {

            color: #fff;
        }
    }
`