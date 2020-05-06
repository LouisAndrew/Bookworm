import React from 'react'

import useFirestoreBook from '../../hooks/useFirestoreBook'
import Rev from './Rev'
// import { useUserData } from '../hooks/useFirestoreUser'

const RevContainer = ({ bookId }) => {

      const collected = useFirestoreBook(bookId)

      return (
            <>
                  {
                        collected[0] && collected.map(rev => <Rev {...rev} isComment={false} />)
                  }
            </>
      )
}

export default RevContainer