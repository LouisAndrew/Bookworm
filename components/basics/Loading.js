import React from 'react'
import styled from 'styled-components'

import Ball from '../../assets/Ball.svg'

const Loading = props => (
    <Container className='loading' {...props}>
        <Ball />
    </Container>
)

export default Loading

const Container = styled.div`
    
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;

    ${({ theme }) => theme.center()};
`