import { useEffect, useState } from 'react'

import { db } from '../lib/firebase'

const useFirestoreBook = bookId => {

    const [ book, setBook ] = useState({ })
    
    const fetchBookData = bookId => {
        
        const dbBookRef = db().collection('Books').doc(bookId)
        //get book data
        dbBookRef.get()
            .then(doc => {

                if (doc.exists) {
                    setBook(doc.data())
                } else {
                    setBook(false)
                }
            })
    }

    useEffect(() => {

        if (!book.reviews) {
            fetchBookData(bookId)
        } 
    })

    return book
}

export default useFirestoreBook
