import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import Feed from './Feed'
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
        }, 400)
    }, [ hotReload ])

    console.log('rendering')

    return (
        <Container className='wrap'>
            <Content>
                {user && <>
                            { !hotReload ? <Feed rerender={rerender} className='flex-item' /> : <h1>loading</h1> }
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