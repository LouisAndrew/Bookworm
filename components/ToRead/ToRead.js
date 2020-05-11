import React, { useContext } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../helper/UserContext'
import BookToRead from './BookToRead'

const ToRead = () => {

    const { user, bookList } = useContext(UserContext)

    return (
        <Container>
            {
                bookList.map(book => <BookToRead book={book} />)
            }
        </Container>
    )
}

export default ToRead

const Container = styled.div`
  
`