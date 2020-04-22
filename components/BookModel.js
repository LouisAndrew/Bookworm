import React, { useState } from 'react'
import styled from 'styled-components'

import useFirestoreBook from '../hooks/useFirestoreBook'
import BookView from './BookView'

const BookModel = props => {

    return <BookView data={props} />
}

export default BookModel
