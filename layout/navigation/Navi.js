import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Search from '../../assets/search.svg'

export const clickSearch = () => {

    const toggleClassElements = [
        document.getElementById('search'),
        document.getElementById('search-bar')
    ]

    toggleClassElements.forEach(el => el.classList.toggle('searching'))
}

const Navi = ({ display }) => {

    const [ isLogged, setIsLogged ] = useState(display)

    return (
        <Container display={isLogged}>
            <Item>
                <Link href='/'>
                    <a>Feeds</a>
                </Link>
            </Item>
            <Item>
                <Link href='/profile'>
                    <a>Profile</a>
                </Link>
            </Item>
            <Item>
                <Link href='/books'>
                    <a>Books</a>
                </Link>
            </Item>
            <Item onClick={clickSearch} className='no-up'>
                <Search id='search' />
            </Item>
        </Container>
    )
}

export default Navi

const Item = styled.li`

    margin: 0 3vh;
    transition: 0.2s;
    height: 100%;
    display: flex;

    a {
        font-weight: bold;
        text-decoration: none;
        color: #000;
        padding: 0 2vh;
        height: 100%;

        display: flex;
        align-items: center;
    }

    &:hover {
        transform: translateY(-10px);
        cursor: pointer;
    }

    &.no-up:hover {
        cursor: pointer;
        transform: translate(0);
    }
  
    #search {
        align-self: center;
        transform: scale(1.3);
        padding: 2px;
        border-radius: 50%;
        transition: .1s;

        &:active, &.searching {
            background-color: rgba(33, 33, 33, 0.2);
        }

    }
`

const Container = styled.ul`
    
    height: 100%;
    list-style: none;
    display: ${props => props.display ? 'flex' : 'none'};
    /* figure out how tf to implement that 🖕 */
    /* display: flex; */

`