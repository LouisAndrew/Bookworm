import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../helper/UserContext'
import BookToRead from './BookToRead'
import Loading from '../basics/Loading'

const ToRead = () => {

    const { user, bookList } = useContext(UserContext)
    const [ hotReload, setHotReload ] = useState(false)

    useEffect(() => {

        if ( hotReload ) {

            setTimeout(() => {
                setHotReload(false)
            }, 200)
        }
    }, [ hotReload ])

    const rerender = () => {

        setHotReload(true)
    }

    return (
        <Container>
            {
                bookList && bookList.length > 0 ? 
                    !hotReload ? bookList.map(book => <BookToRead rerender={rerender} book={book} />) : <Loading />
                    :
                    <h3>No to-read book is available!</h3>
            }
        </Container>
    )
}

export default ToRead

const Container = styled.div`
  
    position: relative;
    min-height: 50vh;
`