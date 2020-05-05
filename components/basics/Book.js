import React from 'react'
import styled from 'styled-components'

import Card from './Card'

const Book = ({ imgUrl, heading, subheading, link, id, click }) => {

    const onClick = () => {
        
        click(id)
    }

    return (
        <Container className='book-cont' onClick={onClick}>
            <Card imgUrl={imgUrl} heading={heading} subheading={subheading} />
        </Container>
    )
}

export default Book

const Container = styled.div`
    height: 100%;
    width: 100%;

    cursor: pointer;
    padding: 2vh;
    margin: 2vh 0;
    border-radius: 15px;
    transition: .2s;

    .container {
        align-items: center;

        .divider {
            margin-left: 10%;
            line-height: 3rem;
        }

        @media only screen and (max-width: 464px) {
                
            .divider {
                max-width: 80%;
            }
        }
    }

    &:hover {

        background-color: rgba(0, 0, 0, .25);
    }
`