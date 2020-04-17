import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'

import { useRouter } from 'next/router'

export const changeClass = e => {

    const val = e.target.value
    if (val) {
        e.target.classList.add('insert')
    } else {
        e.target.classList.remove('insert')
    }
}

const SignIn = ({ loginWithEmail }) => {

    const router = useRouter()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const changeEmail = e => {

        changeClass(e)
        const val = e.target.value
        setEmail(val)
    }

    const changePassword = e => {

        changeClass(e)
        const val = e.target.value
        setPassword(val)
    }

    const signIn = e => {

        e.preventDefault()
        loginWithEmail(email, password)
    }

    const signUp = e => {
        e.preventDefault()
        router.replace('/login', '').then(() => router.push('/signup'))
    }

    return (
        <Container onSubmit={signIn}>
            <label for='email' id='email'>Email</label>
            <input onChange={changeEmail} type='email' />
            <label for='password' id='password'>Password</label>
            <input onChange={changePassword} type='password' />
            <div className='button-group'>
                <Button onClick={signIn} color='#fff' bColor='pink' text='Login' />
                <Button onClick={signUp} color='#fff' bColor='gray' text='Sign Me Up!' />
            </div>
        </Container>
    )
}

export default SignIn

export const Container = styled.form`
    width: 400px;
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;

    label {
        align-self: flex-start;
        padding-left: 5%;
        font-size: 1.2rem;
        margin: 1vh 0;
        color: #fff;
    }

    input {
        background-color: ${({ theme }) => theme.dark};
        width: 100%;
        padding: 1vh 2vh;
        outline: none;
        border: 3px solid ${({ theme }) => theme.pink};
        border-radius: 10px;
        color: #fff;
        transition: 0.2s;
        opacity: 0.2;
        margin: 1vh 0;

        &.insert {
            opacity: 1;
        }

        &:focus {
            opacity: 1;
        }
    }

    .button-group {
        margin-top: 4vh;
        display: flex;

        button {
            margin: 0 2vh;
        }
    }

    @media only screen and (max-width: 464px) {
        
        width: 250px;
    }
`