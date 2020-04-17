import React from 'react'
import styled from 'styled-components'

const Button = props => {
    return (
        <Container {...props}>
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
            case 'gray':
                return props.theme.gray
            case 'dark':
                return props.theme.dark
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
            case 'gray':
                return props.theme.gray
            case 'dark':
                return props.theme.dark
            default: 
                return props.color
        }
    }};
    border-radius: 10px;
    outline: none;
    border: none;
    font-weight: bold;
    box-shadow: 1px 1px #333;

    &:hover {
        cursor: pointer;
    }
`