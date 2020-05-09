import React, { useState, useContext, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Icon, InlineIcon } from '@iconify/react'
import sharpExpandLess from '@iconify/icons-ic/sharp-expand-less'
import { useInView } from 'react-intersection-observer'

import { UserContext } from '../helper/UserContext'

const SearchBar = () => {

    const router = useRouter()
    const ref = useRef()
    const [ inViewRef, inView ] = useInView({
        threshold: 0
    })
    const [ search, setSearch ] = useState('')
    const { lightTheme } = useContext(UserContext)

    const setRefs = useCallback(
        node => {
            ref.current = node
            inViewRef(node)
        }
    )

    const input = e => {
        setSearch(e.target.value)
    }
 
    const searchFor = e => {
        console.log(ref.current.value)
        e.preventDefault()
        ref.current.value = ''
        router.push({ pathname: '/search', query: { q: search } })
        // minimizeSearchBar()
    }

    useEffect(() => {

        if ( inView && window.location.hash === '#search' ) {

            window.location.hash = ''
        }
    })

    return (
        <Container id='search' lightTheme={lightTheme} onSubmit={searchFor} className='wrap'>
            <input onChange={input} ref={setRefs} type='text' placeholder='Search for books here..' />
            {/* <Icon onClick={minimizeSearchBar} className='icon' icon={sharpExpandLess} /> */}
        </Container>
    )
}

export default SearchBar

const Container = styled.form`

    width: 40vw;
    /* max-height: 0; */
    overflow: hidden;
    transition: max-height 1s linear;
    /* still lagged on the dis<SearchBar />play animation */

    background-color: ${({ theme }) => theme.bg};
    box-shadow: ${({ theme }) => theme.shadow};
    transform: translate(-5vw, 2vh);
    border-radius: 15px;
    border: 2px solid ${({ theme }) => theme.pink};

    display: flex;
    align-items: center;
    padding-right: 1rem;

    input {

        width: 100%;
        padding: .5rem 2rem;

        border: none;
        outline: none;
        transition: border .1s linear;
        font-size: 1.2rem;
        /* background: none; */
        background-color: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.font};

        &::placeholder {
            font-size: 1.5rem;
            color: ${props => props.font};
        }

        /* &:focus {
            border-top: 3px solid #000;
        } */
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

/* 
    &.searching {
        max-height: 50vh;
    } */

    @media screen and ( max-width: 840px ) {

        width: 50vw;
        transform: translate(0);
    }

    @media screen and ( max-width: 464px ) {

        width: 70vw;
    }
`