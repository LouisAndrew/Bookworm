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
    const defineExpiration = () => {

        const now = new Date().getTime()
        //30 minutes in milliseconds
        const expiresIn = 30 * 60 * 1000

        return new Date(now + expiresIn)
    }

    const logUserIn = user => {

        Cookie.set('user', JSON.stringify(user), { expires: defineExpiration() })
        //ambil yg atas wkt production!!
        // Cookie.set('user', JSON.stringify(user))
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
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;

    position: absolute;
    top: 40%;
    transform: translate(0, -40%);

    @media only screen and (max-width: 840px) {
        
        padding: 10%;
    }
`