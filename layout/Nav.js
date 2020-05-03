import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Icon, InlineIcon } from '@iconify/react'
import homeFilled from '@iconify/icons-ant-design/home-filled'
import bxsSearchAlt2 from '@iconify/icons-bx/bxs-search-alt-2'
import bxListPlus from '@iconify/icons-bx/bx-list-plus'
import booksIcon from '@iconify/icons-wpf/books'

import { UserContext } from '../helper/UserContext'

const Nav = () => {

    const router = useRouter()
    const [ isLogged, setIsLogged ] = useState(false)
    const { user } = useContext(UserContext)

    // const clickMenu = () => {

    //     document.getElementById('nv').classList.toggle('active')
    // }

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
        }
    })

    return (
        <Contianer id='nav'>
            <Content>
                <Items>
                    { user.displayName && 
                        <>
                            <UserImg src={user.photoURL} />
                            <h3>{user.displayName}</h3>
                        </>
                    }
                </Items>
                <Items>
                    <Icon className='icons' icon={bxsSearchAlt2} />
                    <h3>Search</h3>
                </Items>
                <Items>
                    <Icon className='icons' icon={homeFilled} />
                    <h3>Home</h3>
                </Items>
                <Items>
                    <Icon className='icons' icon={booksIcon} />
                    <h3>Books</h3>
                </Items>
                <Items>
                    <Icon className='icons' icon={bxListPlus} />
                    <h3>To-Read-List</h3>
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
    }

    .icons {

        height: 30px;
        width: 30px;

        border: 1px soild #000;

        margin: 3vh 1vh;

        & + h3 {

            transform: translateX(15px);
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


            h3 {

                max-width: 30vw;
                transform: translate(0);
                margin: 0 1vh;
            }
        }
    }
`

const Contianer = styled.nav`

    height: 100vh;
    position: fixed;

    background-color: ${({ theme }) => theme.bg};
    box-shadow: ${({ theme }) => theme.shadow};
`