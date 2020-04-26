import { useEffect, useState } from 'react'

import { db } from '../lib/firebase'

const useFirestoreBook = bookId => {

    const [ rev, setRev ] = useState({ })
    const [ loaded, setLoaded ] = useState(false)
    
    const fetchBookRev = bookId => {
        
        const dbBookRef = db().collection('Reviews')

        //get book data
        dbBookRef
            .where('bookId', '==', bookId)
            .orderBy('dateCreated', 'desc')
            .get()
            .then(querySnapshot => {

                let temp = [ ]
                querySnapshot.forEach(doc => {
                    temp = [...temp, doc.data()]
                })

                setRev(temp)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        
        if (!loaded) {
            setLoaded(true)
            fetchBookRev(bookId)
        }
    })

    return rev
}

export default useFirestoreBook
