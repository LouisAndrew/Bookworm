import React from 'react'
import styled from 'styled-components'

import useNewestRev from '../../hooks/useNewestRev'
import Rev from '../Reviews/Rev'
import Loading from '../basics/Loading'

const Feed = ({ rerender, hotReload }) => {

    const revs = useNewestRev()

    return (
        <Container>
            <h1>Feed</h1>
            {
                ( revs[0] && !hotReload ) ? <FeedContainer rerender={rerender} revs={revs} /> : <Loading />
            }
        </Container>
    )
}

const FeedContainer = ({ revs, rerender }) => (
    <FCon>
        {
            revs.map(revs => <Rev rerender={rerender} isComment={false} {...revs} />)
        }
    </FCon>
)

export default Feed

const FCon = styled.div`


`

const Container = styled.div`
    width: 100%;
    padding-right: 10%;

    position: relative;

    .loading {

        transform: translate(-10%, 50%);
    }

    @media screen and ( max-width: 840px ) {
        
        padding-right: 0;
    }
`