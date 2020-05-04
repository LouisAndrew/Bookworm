import React from 'react'
import styled from 'styled-components'

import useNewestRev from '../../hooks/useNewestRev'
import Rev from '../Reviews/Rev'

const Feed = () => {

    const revs = useNewestRev()

    return (
        <Container>
            <h1>Feed</h1>
            {
                revs[0] && <FeedContainer revs={revs} />
            }
        </Container>
    )
}

const FeedContainer = ({ revs }) => (
    <FCon>
        {
            revs.map(revs => <Rev {...revs} />)
        }
    </FCon>
)

export default Feed

const FCon = styled.div`


`

const Container = styled.div`
    width: 100%;
    padding-right: 10%;

    @media screen and ( max-width: 840px ) {
        
        padding-right: 0;
    }
`