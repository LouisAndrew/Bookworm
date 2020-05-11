import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Icon, InlineIcon } from '@iconify/react'
import homeFilled from '@iconify/icons-ant-design/home-filled'
import bxsSearchAlt2 from '@iconify/icons-bx/bxs-search-alt-2'
import bxListPlus from '@iconify/icons-bx/bx-list-plus'
import booksIcon from '@iconify/icons-wpf/books'
import userEdit from '@iconify/icons-fa-solid/user-edit'
import Cookie from 'js-cookie'

import { UserContext } from '../helper/UserContext'
import useFirestoreUser from '../hooks/useFirestoreUser'

const Nav = () => {

    const router = useRouter()
    const [ isLogged, setIsLogged ] = useState(false)
    const { user, themeLight, addUser } = useContext(UserContext)
    const { cookieUser, setCookieUser } = useState( Cookie.get('user') )
    const iconColor = themeLight ? 'black' : 'white' 

    const userTemp = cookieUser && useFirestoreUser(cookieUser)

    useEffect(() => {

        //if there's no user (indicated by the display name) => go to login page...
        if ( !user.uid ) {

            if ( !userTemp )  {

                document.getElementById('main').classList.add('login')
                document.getElementById('nav').style.display = 'none'
    
                if (!user.uid && router.pathname !== '/login') {
    
                    router.push('/login')
                }
            } else {

                addUser(userTemp)
            }

        } else {
            chooseActive()
            !isLogged && setIsLogged(true)
        }
    })

    const goTo = e => {

        //helper method => get href attr from element node, then pushing to the router!
        const href = e.target.getAttribute('href')
        if ( href !== router.pathname && href ) {

            router.push(href)
        }
    }

    const goToIcon = e => {

        //helper when user clicks on icon => get parent element then it's href attr
        const parent = e.target.parentElement.parentElement
        const href = parent && parent.getAttribute('href')
        if ( href !== router.pathname && href ) {
            router.push(href)
        }
    }

    const goToSearch = () => {

        const SEARCH_HREF = '#search'
        window.location.hash = SEARCH_HREF
    }

    const chooseActive = () => {

        const path = router.pathname.split('/')[1]

        const items = Array.from( document.querySelectorAll('#nav li') )
        items.forEach(li => {
            
            const hrefSplitted = li.getAttribute('href').split('/')[1]
            if ( hrefSplitted === path ) {
                li.classList.add('active')
            } else {

                li.classList.remove('active')
            }
        })
    }

    return (
        <Contianer themeLight={themeLight} id='nav'>
            <Content>
                <Items href='/users' onClick={goTo}>
                    { user.uid && 
                        <>
                            <UserImg onClick={goToIcon} src={user.photoURL} />
                        </>
                    }
                </Items>
                <Items href='/' onClick={goTo}>
                    <Icon onClick={goToIcon} className='icons' icon={homeFilled} color={iconColor} />
                </Items>
                <Items href='/books' onClick={goTo}>
                    <Icon onClick={goToIcon} className='icons' icon={booksIcon} color={iconColor} />
                </Items>
                <Items href='/users' onClick={goTo}>
                    <Icon onClick={goToIcon} className='icons' icon={userEdit} color={iconColor} />
                </Items>
                <Items onClick={goToSearch} href='/search'>
                    <Icon onClick={goToSearch} className='icons' icon={bxsSearchAlt2} color={iconColor} />
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

            &:hover {

                border-left: none;
            }
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