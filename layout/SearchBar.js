import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Icon, InlineIcon } from '@iconify/react'
import sharpExpandLess from '@iconify/icons-ic/sharp-expand-less'

import { UserContext } from '../helper/UserContext'

const SearchBar = () => {

    const router = useRouter()
    const ref = React.createRef()
    const [ search, setSearch ] = useState('')
    const { lightTheme } = useContext(UserContext)

    const input = e => {
        setSearch(e.target.value)
    }
 
    const searchFor = e => {
        e.preventDefault()
        ref.current.value = ''
        router.push({ pathname: '/search', query: { q: search } })
        minimizeSearchBar()
    }

    const minimizeSearchBar = () => {

        document.getElementById('search-bar').classList.toggle('searching')
        document.getElementById('lighter').classList.toggle('searching')
    }

    return (
        <Container lightTheme={lightTheme} onSubmit={searchFor} id='search-bar' className='wrap'>
            <input onChange={input} ref={ref} type='text' placeholder='Search Here..' />
            <Icon onClick={minimizeSearchBar} className='icon' icon={sharpExpandLess} />
        </Container>
    )
}

export default SearchBar

const Container = styled.form`

    width: 40vw;
    max-height: 0;
    overflow: hidden;
    transition: max-height 1s linear;
    /* still lagged on the display animation */

    position: fixed;
    top: 0;
    right: 0;

    background-color: ${({ theme }) => theme.bg};
    box-shadow: ${({ theme }) => theme.shadow};

    display: flex;
    align-items: center;
    padding-right: 1rem;

    input {

        width: 100%;
        padding: 1rem 2rem;

        border: none;
        outline: none;
        transition: border .1s linear;
        font-size: 1.5rem;
        background-color: ${props => props.bg};
        color: ${props => props.font};

        &::placeholder {
            font-size: 1.5rem;
            color: ${props => props.font};
        }

        &:focus {
            border-top: 3px solid #000;
        }
    }

    .icon {

        height: 10%;
        width: 5%;

        transition: .2s;

        &:hover {

            cursor: pointer;
            transform: translateY(-5px);
        }
    }

    &.searching {
        max-height: 50vh;
    }

    @media screen and ( max-width: 464px ) {

        width: 70vw;
    }
`