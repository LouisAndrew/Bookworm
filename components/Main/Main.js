import React, { useEffect, useState, useContext } from 'react'
import Cookie from 'js-cookie'
import styled from 'styled-components'

import Feed from './Feed'
import ProfileFeed from './ProfileFeed'
import useFirestoreUser from '../../hooks/useFirestoreUser'
import { UserContext } from '../../helper/UserContext'

const Main = () => {

    const [ user, setUser ] = useState({ })
    const ctx = useContext(UserContext)
    const { photoURL, displayName, uid } = useFirestoreUser(Cookie.getJSON('user'))

    if (displayName && !user.displayName) {

        const userData = { photoURL, displayName, uid }

        ctx.addUser(userData)
        setUser(userData)
    }

    console.log({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
    })

    return (
        <Container className='wrap'>
            <Content>
                {user && <>
                            <Feed className='flex-item' />
                            <ProfileFeed user={user} className='flex-item' />
                         </>}
            </Content>
        </Container>
    )
}

export default Main

const Content = styled.section`
    display: flex;
    margin-top: 10vh;
    width: 100%;

    .flex-item {
        width: 100%;    
    }

    @media screen and (max-width: 840px) {
        
        flex-direction: column-reverse;
    }
`

const Container = styled.div`
    width: 100%;
`