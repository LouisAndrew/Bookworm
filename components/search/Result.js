import React from 'react'
import styled from 'styled-components'

import Book from '../basics/Book'

export const extract = item => {

    const undefinedItem = 'No further details'

    const temp = {
        imgUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail,
        heading: item.volumeInfo.title ? item.volumeInfo.title: undefinedItem,
        subheading: item.volumeInfo.authors ? item.volumeInfo.authors[0] : undefinedItem,
        id: item.id
    }

    return temp
}

const Result = ({ items, query }) => {


    return (
        <Container>
            <Content className='wrap'>
                <h4>Showing search results of: {query}  </h4>
                {
                    items.map(item => <Book {...extract(item)} />)
                }
            </Content>
        </Container>
    )
}

export default Result

const Content = styled.section`
    width: 100%;
    margin: 5vh 0;
`

const Container = styled.div`
    width: 100%;
    ${({ theme }) => theme.center()};
`