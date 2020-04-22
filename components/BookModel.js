import React, { useState } from 'react'
import styled from 'styled-components'

import useFirestoreBook from '../hooks/useFirestoreBook'
import BookView from './BookView'

const BookModel = props => {

    const [ bookData, setBokData ] = useState(useFirestoreBook(props.id))

    return <BookView data={props} dbData={bookData} />
}

export default BookModel
