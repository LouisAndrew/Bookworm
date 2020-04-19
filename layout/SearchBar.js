import React from 'react'
import styled from 'styled-components'

const SearchBar = () => {

    console.log('refactoring..')

    return (
        <Container id='search-bar' className='wrap'>
            <input type='text' placeholder='Search Here..' />
        </Container>
    )
}

export default SearchBar

const Container = styled.form`
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 1s linear;

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