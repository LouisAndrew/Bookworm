import React from 'react'
import styled from 'styled-components'

const LoginHeader = props => {
    return (
        <Container {...props}>
            <h1>Welcome to Bookworm</h1>
            <h2>a Social Media platform to share and discover books</h2>
        </Container>
    )
}

export default LoginHeader

const Container = styled.div`
    width: 100%;
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;
    color: #fff;
    padding: 5vh;
    line-height: 8rem;
    background-color: ${({ theme }) => theme.dark};

    h2 {
        text-align: center;
        line-height: 2rem;
    }

    @media only screen and (max-width: 464px) {
        
        h2 {
            text-align: left;
        }
    }
`