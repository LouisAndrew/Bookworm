import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../../lib/firebase'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import useFirestoreUser from '../../hooks/useFirestoreUser'
import Button from '../basics/Button'
import LoginHeader from './LoginHeader'
import { UserContext } from '../../helper/UserContext'
import useFeedbackElement from '../../hooks/useFeedbackElement'

const Login = () => {

    const router = useRouter()
    const [ savedUser, setSavedUser ] = useState('')
    const userData = useFirestoreUser(savedUser)

    const { user, addUser, themeLight } = useContext(UserContext)

    const [ showFeedback, setShowFeedback ] = useState(false)
    const [ text, setText ] = useState('')
    const [ isAnError, setIsAnError ] = useState(true)
    const feedback = useFeedbackElement(text, isAnError)

    if ( userData.uid ) {
        addUser(userData)
            .then(() => {
                console.log('success adding user')
                document.getElementById('head').innerText = `hello ${user.displayName}`
                router.push('/')
            })
    }

    useEffect(() => {

        if ( showFeedback ) {

            setTimeout(() => {
                setShowFeedback(false)
            }, 2000)
        }

    }, [ showFeedback ])

    const defineExpiration = () => {

        const now = new Date().getTime()
        //30 minutes in milliseconds
        const expiresIn = 30 * 60 * 1000

        return new Date(now + expiresIn)
    }

    const logUserIn = user => {

        //do I still need cookie?
        Cookie.set('user', JSON.stringify(user), { expires: defineExpiration() })
        //ambil yg atas wkt production!!
        // Cookie.set('user', JSON.stringify(user))
        setSavedUser(user)
    }

    const loginWithGoogle = () => {
        const googleProvider = new auth.GoogleAuthProvider()

        auth().signInWithPopup(googleProvider)
            .then(res => {
                logUserIn(res.user)
            })
            .catch(err => {
                console.log(err)
                handleError(err.code)
            })
    }

    const handleError = errId => {

        setShowFeedback(true)
        setIsAnError(true)

        switch ( errId ) {

            case 'auth/network-request-failed':
                setText('Please check your connection')
            default:
                setText('Oops! Something is wrong.')
        }
    }

    return (
        <Container>
            { showFeedback && feedback }
            <LoginHeader className='login-head' />
            <h3 id='head'></h3>
            <Button onClick={loginWithGoogle} color='font' bColor='bg' border={`3px solid ${themeLight ? '#000' : '#fff' }`} text='Login With Google' />
        </Container>
    )
}

export default Login

const Container = styled.section`
    width: 100%;
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;

    position: absolute;
    top: 40%;
    transform: translate(0, -40%);

    #el {

        top: -60%;
    }

    @media only screen and (max-width: 840px) {
        
        padding: 10%;
    }
`