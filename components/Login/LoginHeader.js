import React from 'react'
import styled from 'styled-components'

const LoginHeader = props => {
    return (
        <Container {...props}>
            <h1>Welcome to Bookworm</h1>
            <h3>a Social Media platform to share and discover books</h3>
        </Container>
    )
}

export default LoginHeader

const Container = styled.div`
    width: 100%;
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;
    padding: 5vh;
    line-height: 8rem;

    h1 {
        font-size: 4rem;
    }

    h3 {
        text-align: center;
        line-height: 2rem;
    }

    @media only screen and (max-width: 464px) {
        
        h3 {
            text-align: left;
        }
    }
`