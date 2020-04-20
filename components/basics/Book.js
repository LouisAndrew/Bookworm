import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Card from './Card'

const Book = ({ imgUrl, heading, subheading, link, id }) => {

    const router = useRouter()

    const click = () => {
        router.push('/books/[bid]', `/books/${id}`)
    }

    return (
        <Container onClick={click}>
            <Card imgUrl={imgUrl} heading={heading} subheading={subheading} />
        </Container>
    )
}

export default Book

const Container = styled.div`
    height: 100%;
    width: 100%;

    cursor: pointer;

    .container {
        align-items: center;
        margin: 5vh 0;

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
`