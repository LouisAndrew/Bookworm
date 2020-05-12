import React, { useEffect, useState } from 'react'

import { db } from '../lib/firebase'

const useUserBookList = uid => {

    const [ bookList, setBookList ] = useState([ ])
    const [ loaded, setLoaded ] = useState(false)

    const fetch = uid => {

        const dbRef = db().collection('User').doc(uid)

        dbRef.get()
            .then(doc => {

                doc.exists && filterBookList(doc.data())
            })
    }

    const filterBookList = data => {

        setBookList(data.bookList)
        setLoaded(true)
    }

    useEffect(() => {

        if ( !loaded && uid ) fetch(uid)
    })

    return bookList && bookList
}

export default useUserBookList
