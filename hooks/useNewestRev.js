import React, { useEffect, useState } from 'react'

import { db } from '../lib/firebase'

const useNewestRev = () => {
    
    const [ rev, setRev ] = useState({ })
    const [ loaded, setLoaded ] = useState(false)
    const dbRef = db().collection('Reviews')

    const fetch = () => {

        dbRef
            .orderBy('dateCreated', 'desc')
            .get()
            .then(querySnapshot => {

                let temp = [ ]

                querySnapshot.forEach(doc => temp = [...temp, doc.data()])

                setRev(temp)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {

        if (!loaded) {
            setLoaded(true)
            fetch()
        }
    })
    return rev
}

export default useNewestRev
