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

        } else if (user.displayName) {
            chooseActive()
            !isLogged && setIsLogged(true)
        }
    })

    const goTo = e => {

        //helper method => get href attr from element node, then pushing to the router!
        const href = e.target.getAttribute('href')
        if ( href !== router.pathname && href ) {

            router.push(href, { shallow: true })
        }
    }

    const goToIcon = e => {

        //helper when user clicks on icon => get parent element then it's href attr
        const parent = e.target.parentElement.parentElement
        const href = parent && parent.getAttribute('href')
        if ( href !== router.pathname && href ) {
            console.log(href)
            router.push(href, { shallow: true })
        }
    }

    const chooseActive = () => {

        const path = router.pathname.split('/')[1]

        const items = Array.from( document.querySelectorAll('#nav li') )
        items.forEach(li => {
            
            const hrefSplitted = li.getAttribute('href').split('/')[1]
            if ( hrefSplitted === path ) {
                li.classList.add('active')
                console.log(li.firstChild.classList)
            } else {

                li.classList.remove('active')
            }
        })
    }

    return (
        <Contianer themeLight={themeLight} id='nav'>
            <Content>
                <Items href='/users' onClick={goTo}>
                    { user.displayName && 
                        <>
                            <UserImg onClick={goToIcon} src={user.photoURL} />
                        </>
                    }
                </Items>
                <Items href='/search' onClick={clickSearch}>
                    <Icon onClick={goToIcon} className='icons' icon={bxsSearchAlt2} color={iconColor} />
                </Items>
                <Items href='/' onClick={goTo}>
                    <Icon onClick={goToIcon} className='icons' icon={homeFilled} color={iconColor} />
                </Items>
                <Items href='/books' onClick={goTo}>
                    <Icon onClick={goToIcon} className='icons' icon={booksIcon} color={iconColor} />
                </Items>
                <Items href='/' onClick={goTo}>
                    <Icon onClick={goToIcon} className='icons' icon={bxListPlus} color={iconColor} />
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

    margin: 3vh 2vh;

    @media screen and ( max-width: 464px ) {
        
        height: 50px;
        width: 50px;

        margin: 1vh 2vh;
    }
`

const Items = styled.li`

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    transition: .2s;

    .icons {

        margin: 3vh;

        height: 30px;
        width: 30px;

        &.active {

            border-bottom: 3px solid ${({ theme }) => theme.pink};
        }

        @media screen and ( max-width: 840px ) {
            
            margin: 3vh;
        }
    }

    &:hover {

        border-left: 3px solid ${({ theme }) => theme.bg};
    }   

    &.active {

        border-left: 3px solid ${({ theme }) => theme.bg};

        .icons {

            path { fill: ${({ theme }) => theme.bg}; }
        }

        @media screen and ( max-width: 840px ) {
            
            border-bottom: 3px solid ${({ theme }) => theme.bg};
            border-left: none;
        }
    }
`

const Content = styled.ul`
    
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: .2s;

    &:hover {

        cursor: pointer;
    }

    @media screen and ( max-width: 840px ) {

        flex-direction: row;
    }
`

const Contianer = styled.nav`

    height: 100vh;
    position: fixed;

    background-color: ${({ theme }) => theme.pink};
    box-shadow: ${({ theme }) => theme.shadow};

    @media screen and ( max-width: 840px ) {
        
        height: auto;
        width: 100%;
        bottom: 0;

        z-index: 5;
    }
`