import React from 'react'
import styled from 'styled-components'

const Button = props => {
    return (
        <Container className='button' {...props}>
            {props.text}
        </Container>
    )
}

export default Button

const Container = styled.button`
    padding: 1vh 2vh;
    background-color: ${props => {
        switch (props.bColor) {
            case 'pink':
                return props.theme.pink
            case 'bg':
                return props.theme.bg
            default: 
                return props.bColor
        }
    }};
    color: ${props => {
        switch (props.color) {
            case 'pink':
                return props.theme.pink
            case 'bg':
                return props.theme.bg
            case 'font':
                return props.theme.font
            default: 
                return props.color
        }
    }} !important;
    border-radius: 10px;
    outline: none;
    border: ${props => props.border ? props.border : 'none' };
    font-weight: bold;
    /* box-shadow: 1px 1px rgba(21, 21, 21, 0.6); */

    &:hover {
        cursor: pointer;
    }
`