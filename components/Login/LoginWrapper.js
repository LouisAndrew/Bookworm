import React, { useState, useContext } from 'react'
import { auth, firebaseApp } from '../../lib/firebase'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { UserContext } from '../../helper/UserContext'
import Button from '../basics/Button'
import LoginHeader from './LoginHeader'

const LoginWrapper = () => {

    const router = useRouter()
    const { user, addUser } = useContext(UserContext)

    const defineExpiration = () => {

        const now = new Date().getTime()
        //30 minutes in milliseconds
        const expiresIn = 30 * 60 * 1000

        return new Date(now + expiresIn)
    }

    const logUserIn = user => {

        console.log(user)
        // setUser(user)
        Cookie.set('user', JSON.stringify(user), { expires: defineExpiration() })
        document.getElementById('head').innerText = `hello ${user.displayName}`

        setTimeout(() => {
            router.push('/')
        }, 500)
    }

    const loginWithGoogle = () => {
        const googleProvider = new auth.GoogleAuthProvider()

        auth().signInWithPopup(googleProvider)
            .then(res => {
                logUserIn(res.user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log(Cookie.getJSON('user')) 

    return (
        <Container>
            <LoginHeader className='login-head' />
            <h3 id='head'></h3>
            <Button onClick={loginWithGoogle} color='#000' bColor='#fff' border='3px solid #000' text='Login With Google' />
        </Container>
    )
}

export default LoginWrapper

const Container = styled.section`
    width: 100%;
    min-height: 92vh;
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;

    @media only screen and (max-width: 850px) {
        
        padding: 10%;
    }
`