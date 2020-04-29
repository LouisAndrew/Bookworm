import React from 'react'
import styled from 'styled-components'

import Navi from './navigation/Navi'

const Navbar = () => {

    return (
        <Container>
            <h3>BookWorm</h3>
            <Navi />
        </Container>
    )
}

export default Navbar

const Container = styled.nav`
    width: 100%;
    height: 8vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 15%;
    box-shadow: 2px 2px 5px #ddd;
    
    #menu {
        display: none;
    }

    @media screen and (max-width: 840px) {
        
        #menu {
            display: block;
        }
    }
`