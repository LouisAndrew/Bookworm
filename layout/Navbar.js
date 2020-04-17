import React from 'react'
import styled from 'styled-components'

const Navbar = () => {
    return (
        <Container>
            <h3>BookWorm</h3>
        </Container>
    )
}

export default Navbar

const Container = styled.nav`
    width: 100%;
    height: 8vh;
    position: relative;
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;
    padding: 0 15%;
    box-shadow: 2px 2px 4px #333;

    h3 {
        align-self: flex-start;
    }
`