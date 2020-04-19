import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const SearchBar = () => {

    const router = useRouter()
    const ref = React.createRef()
    const [ search, setSearch ] = useState('')

    const input = e => {
        setSearch(e.target.value)
    }
 
    const searchFor = e => {
        e.preventDefault()
        ref.current.value = ''
        router.push({ pathname: '/search', query: { q: search } })
    }

    return (
        <Container onSubmit={searchFor} id='search-bar' className='wrap'>
            <input onChange={input} ref={ref} type='text' placeholder='Search Here..' />
        </Container>
    )
}

export default SearchBar

const Container = styled.form`
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 1s linear;
    /* still lagged on the display animation */

    input {
        width: 100%;
        padding: 1rem 2rem;
        border: none;
        outline: none;
        transition: border .1s linear;
        font-size: 1.5rem;

        &::placeholder {
            font-size: 1.5rem;
        }

        &:focus {
            border-top: 3px solid #000;
        }
    }

    &.searching {
        max-height: 50vh;
    }

`