import React, { useEffect } from 'react'
import styled from 'styled-components'

const useFeedbackElement = (text, isAnError) => {

    useEffect(() => {

        const element = document.getElementById('el')
        if ( element ) {

            element.style.opacity = 1
            element.style.transform = 'translate(-50%, 0)'
        }
    })

    return (
        <El id='el' $isAnError={isAnError}>
            <h5>{text}</h5>
        </El>
    )
}

export default useFeedbackElement


const El = styled.div`
    
    background-color: ${props => props.$isAnError ? 'red' : 'green'};
    opacity: 0;
    transform: translate(-50%, -20px);
    transition: .2s;
    transition-delay: .2s;

    border-radius: 5px;

    position: absolute;
    top: 10%;
    left: 50%;

    h5 {

        color: #fff !important;
        padding: 1vh;
    }
`