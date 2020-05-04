import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Icon, InlineIcon } from '@iconify/react'
import homeFilled from '@iconify/icons-ant-design/home-filled'
import bxsSearchAlt2 from '@iconify/icons-bx/bxs-search-alt-2'
import bxListPlus from '@iconify/icons-bx/bx-list-plus'
import booksIcon from '@iconify/icons-wpf/books'
import Link from 'next/link'

import { UserContext } from '../helper/UserContext'

const Nav = () => {

    const router = useRouter()
    const [ isLogged, setIsLogged ] = useState(false)
    const { user, themeLight } = useContext(UserContext)
    const iconColor = themeLight ? 'black' : 'white' 

    const clickSearch = () => {
    
        document.getElementById('search-bar').classList.toggle('searching')
        document.getElementById('lighter').classList.toggle('searching')
    }

    useEffect(() => {

        //if there's no user (indicated by the display name) => go to login page...
        if ( !user.displayName ) {

            document.getElementById('main').classList.add('login')
            document.getElementById('nav').style.display = 'none'

            if (!user.displayName && router.pathname !== '/login') {

                router.push('/login')
            }

        } else if (!isLogged && user.displayName) {
            setIsLogged(true)
            chooseActive()
        }
    })

    const goTo = e => {

        //helper method => get href attr from element node, then pushing to the router!
        const href = e.target.getAttribute('href')
        if ( href !== router.pathname && href ) {

            router.push(href, { shallow: true })
        }
    }

    const chooseActive = () => {

        const path = router.pathname.split('/')[1]

        const items = Array.from( document.querySelectorAll('#nav li') )
        items.forEach(li => {
            
            const hrefSplitted = li.getAttribute('href').split('/')[1]
            if ( hrefSplitted === path ) {
                li.firstChild.classList.add('active')
                console.log(li.firstChild.classList)
            } else {

                li.firstChild.classList.remove('active')
            }
        })
    }

    return (
        <Contianer themeLight={themeLight} id='nav'>
            <Content>
                <Items href='/users' onClick={goTo}>
                    { user.displayName && 
                        <>
                            <UserImg src={user.photoURL} />
                            <Link href='/users'>
                                <h3>{user.displayName}</h3> 
                            </Link>
                        </>
                    }
                </Items>
                <Items href='/search' onClick={clickSearch}>
                    <Icon className='icons' icon={bxsSearchAlt2} color={iconColor} />
                    <h3>Search</h3>
                </Items>
                <Items href='/' onClick={goTo}>
                    <Icon className='icons' icon={homeFilled} color={iconColor} />
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                </Items>
                <Items href='/books' onClick={goTo}>
                    <Icon className='icons' icon={booksIcon} color={iconColor} />
                    <Link href='/books'>
                        <a>Books</a>
                    </Link>
                </Items>
                <Items href='/' onClick={goTo}>
                    <Icon className='icons' icon={bxListPlus} color={iconColor} />
                    <Link href='/'>
                        <a>To-Read</a>
                    </Link>
                </Items>
            </Content>
        </Contianer>    
    )
}

export default Nav

const UserImg = styled.img`
    
    height: 60px;
    width: 60px;
    border-radius: 50%;

    margin: 3vh 1vh;

    @media screen and ( max-width: 464px ) {
        
        height: 50px;
        width: 50px;
    }
`

const Items = styled.li`

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    transition: .2s;

    h3 {

        max-width: 0;
        transition: .2s;

        border: 1px soild #000;
        color: ${({ theme }) => theme.font};
    }

    .icons {

        height: 30px;
        width: 30px;

        margin: 3vh 1vh;

        & + a, & + h3 {

            transform: translateX(15px);
            text-decoration: none;
            color: ${({ theme }) => theme.font};
            max-width: 0;

            font-size: 1.2rem;
            font-weight: normal;
        }

        &.active {

            border-bottom: 3px solid ${({ theme }) => theme.pink};
        }
    }

    &:hover {

        background-color: ${({ theme }) => theme.fg};
    }
`

const Content = styled.ul`
    
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: .2s;

    &:hover {

        cursor: pointer;

        li {


            h3, a {

                max-width: 30vw;
                transform: translate(0);
                margin: 0 1vh;
            }
        }
    }

    @media screen and ( max-width: 464px ) {

        flex-direction: row;

        li {

            h3, a {
                display: none;
            }
        }
    }
`

const Contianer = styled.nav`

    height: 100vh;
    position: fixed;

    background-color: ${({ theme }) => theme.bg};
    box-shadow: ${({ theme }) => theme.shadow};

    @media screen and ( max-width: 464px ) {
        
        height: auto;
        width: 100%;
        bottom: 0;

        z-index: 5;
    }
`