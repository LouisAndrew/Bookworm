import React, { useEffect, useState, useContext } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { db } from '../../lib/firebase'
import Feed from './Feed'
import ProfileFeed from './ProfileFeed'
import useFirestoreUser from '../../hooks/useFirestoreUser'
import { UserContext } from '../../helper/UserContext'

const Main = () => {

    const [ user, setUser ] = useState({ })
    const ctx = useContext(UserContext)
    const { photoURL, displayName } = useFirestoreUser(Cookie.getJSON('user'))

    if (displayName && !user.displayName) {

        const userData = { photoURL, displayName }

        ctx.addUser(userData)
        setUser(userData)
    }

    console.log(user)

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
    background-color: pink;

    .flex-item {
        width: 50%;    }
`

const Container = styled.div`
    width: 100%;
`