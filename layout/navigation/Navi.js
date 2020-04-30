import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Menu from '../../assets/menu.svg'
import Search from '../../assets/search.svg'
import { UserContext } from '../../helper/UserContext'

export const clickSearch = () => {

    const toggleClassElements = [
        document.getElementById('search'),
        document.getElementById('search-bar'),
        document.getElementById('nv')
    ]

    toggleClassElements.forEach(el => el.classList.toggle('searching'))
}

const Navi = () => {

    //all based on user provided by user context
    const router = useRouter()
    const [ isLogged, setIsLogged ] = useState(false)
    const { user } = useContext(UserContext)

    const clickMenu = () => {

        document.getElementById('nv').classList.toggle('active')
    }

    console.log(isLogged)

    useEffect(() => {

        //if there's no user (indicated by the display name) => go to login page...
        if (!user.displayName && router.pathname !== '/login') {
            router.push('/login')
        } else {

            if (!isLogged && user.displayName) {
                setIsLogged(true)
            }
        }
    })

    return (
        <>
            <Menu onClick={clickMenu} id='menu' />
            <Container id='nv' display={isLogged}>
                <Item>
                    <Link href='/'>
                        <a>Feeds</a>
                    </Link>
                </Item>
                <Item>
                    <Link href='/users'>
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
        </>
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

    @media screen and (max-width: 840px) {

        margin: 0;
        height: auto;
        width: 100%;

        display: flex;
        justify-content: center;

        #search {
            order: 1;
            margin: 2vh 0;
        }

        a {
            order: 2;
            padding: 2vh 0;
            font-size: 1.5rem;
        }
/* 
        a {
            display: flex;
            justify-content: center;
        } */
    }
`

const Container = styled.ul`
    
    height: 100%;
    list-style: none;
    display: ${props => props.display ? 'flex' : 'none'};
    /* figure out how tf to implement that 🖕 */
    /* display: flex; */

    @media screen and (max-width: 840px) {
        
        height: 92vh;
        width: 100%;
        position: absolute;
        top: 8vh;
        left: 0;
        max-width: 0;
        overflow: hidden;

        padding: 2vh 0;
        z-index: 2;

        transition: .2s, max-width .5s;
        background-color: #fff;
        flex-direction: column;

        &.searching {

            transform: translateY(5rem);
        }

        &.active {
            max-width: 100vh;
        }
    }

`