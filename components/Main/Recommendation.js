import React from 'react'
import styled from 'styled-components'

import Postable from '../basics/Postable'

const Recommendation = () => {
    return (
        <Container>
            <Postable />
        </Container>
    )
}

export default Recommendation

const Container = styled.div`
    width: 100%;
    background-color: pink;
`