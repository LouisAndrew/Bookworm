import React from 'react'

import useFirestoreBook from '../hooks/useFirestoreBook'
import Rev from './Rev'
import { useUserData } from '../hooks/useFirestoreUser'

const RevContainer = ({ bookId, bookName }) => {

      const collected = useFirestoreBook(bookId)
      console.log(bookName)

      return (
            <>
                  {
                        collected[0] && collected.map(rev => <Rev {...rev} bookName={bookName} />)
                  }
            </>
      )
}

export default RevContainer