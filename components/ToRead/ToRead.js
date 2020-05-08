import React, { useContext } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../helper/UserContext'

const ToRead = () => {

    const { user, bookList } = useContext(UserContext)

    console.log(user)
    console.log(bookList)

    return (
        <Container>
            
        </Container>
    )
}

export default ToRead

const Container = styled.div`
  
`