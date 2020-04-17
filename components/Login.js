import React, { useState } from 'react'
import { auth, firebaseApp } from '../lib/firebase'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

import styled from 'styled-components'
import Button from './Button'
import LoginHeader from './LoginHeader'
import SignIn from './SignIn'

const Login = () => {

    const router = useRouter()
    const [ user, setUser ] = useState({ })

    const defineExpiration = () => {

        const now = new Date().getTime()
        //30 minutes in milliseconds
        const expiresIn = 30 * 60 * 1000

        return new Date(now + expiresIn)
    }

    const logUserIn = user => {

        console.log(user)
        setUser(user)
        Cookie.set('user', JSON.stringify(user), { expires: defineExpiration() })
        document.getElementById('head').innerText = `hello ${user.displayName}`

        setTimeout(() => {
            router.back()
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

    const loginWithEmail = (email, password) => {

        auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res.user)
                console.log(res)
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
            <SignIn loginWithEmail={loginWithEmail} />
            <Button onClick={loginWithGoogle} color='#fff' bColor='#4285F4' text='Login With Google' />
        </Container>
    )
}

export default Login

const Container = styled.section`
    width: 100%;
    padding: 5% 10%;
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;
    background-color: ${({ theme }) => theme.dark};

    .login-head {
        margin-bottom: 2vh;
    }

    form {
        margin: 2vh 0;
    }

    @media only screen and (max-width: 850px) {
        
        padding: 10%;
    }
`