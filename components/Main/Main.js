import React, { useContext } from 'react'
import styled from 'styled-components'

import Feed from './Feed'
import ProfileFeed from './ProfileFeed'
import { UserContext } from '../../helper/UserContext'
import Recommendation from './Recommendation'

const Main = () => {

    const { user } = useContext(UserContext)

    return (
        <Container className='wrap'>
            <Content>
                {user && <>
                            <Feed className='flex-item' />
                            {/* <ProfileFeed user={user} className='flex-item' /> */}
                            <Recommendation />
                         </>}
            </Content>
        </Container>
    )
}

export default Main

const Content = styled.section`
    display: flex;
    margin-top: 5vh;
    width: 100%;

    padding: 0 8%;

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