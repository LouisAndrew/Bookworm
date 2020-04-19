import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Feed from './Feed'
import ProfileFeed from './ProfileFeed'

const Main = () => {
    const [ user, setUser ] = useState(Cookie.getJSON('user'))

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