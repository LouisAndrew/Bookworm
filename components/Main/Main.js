import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import Feed from './Feed'
import ProfileFeed from './ProfileFeed'
import { UserContext } from '../../helper/UserContext'
import Recommendation from './Recommendation'

const Main = () => {

    const { user } = useContext(UserContext)
    const [ hotReload, setHotReload ] = useState(false)

    const rerender = () => {

        setHotReload(true)
    }

    useEffect(() => {

        setTimeout(() => {
            hotReload && setHotReload(false)
        }, 200)
    }, [ hotReload ])

    console.log('rendering')

    return (
        <Container className='wrap'>
            <Content>
                {user && <>
                            { !hotReload ? <Feed className='flex-item' /> : <h1>loading</h1> }
                            {/* <ProfileFeed user={user} className='flex-item' /> */}
                            <Recommendation className='flex-item' rerender={rerender} />
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