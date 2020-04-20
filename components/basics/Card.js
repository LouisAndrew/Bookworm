import React from 'react'
import styled from 'styled-components'

const Card = ({ imgUrl, heading, subheading }) => {
    return (
        <Container className='container'>
            <img src={imgUrl} />
            <div className='divider'>
                <h2 className='heading'>{heading} </h2>
                <h3 className='subheading'>{subheading} </h3>
            </div>
        </Container>
    )
}

export default Card

const Container = styled.div`
    ${({ theme }) => theme.fitContainer()};
    display: flex;

    .divider {

        h2, h3 {
            text-decoration: none;
            color: #000;
        }
    }
`