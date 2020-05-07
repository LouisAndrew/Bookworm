import React, { useState, useEffect } from 'react'

import useFirestoreBook from '../../hooks/useFirestoreBook'
import Rev from './Rev'
// import { useUserData } from '../hooks/useFirestoreUser'

const RevContainer = ({ bookId }) => {

      const [ hotReload, setHotReload ] = useState(false)
      const collected = useFirestoreBook(bookId)

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
            <>
                  {
                        collected[0] && collected.map(rev => <Rev rerender={rerender} {...rev} isComment={false} />)
                  }
            </>
      )
}

export default RevContainer