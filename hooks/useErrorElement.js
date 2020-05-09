import React from 'react'
import styled from 'styled-components'

const useErrorElement = ({ text, isAnError }) => {
    return (
        <El isAnError={isAnError}>
            
        </El>
    )
}

export default useErrorElement


const El = styled.div`
    
    color: #fff;
`