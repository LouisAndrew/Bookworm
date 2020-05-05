import React from 'react'
import styled from 'styled-components'

import Postable from '../basics/Postable'

const Recommendation = ({ rerender }) => {
    return (
        <Container>
            <Postable rerender={rerender} />
        </Container>
    )
}

export default Recommendation

const Container = styled.div`
    width: 100%;

    @media screen and ( max-width: 840px ) {
        
        margin-bottom: 4vh;
    }
`