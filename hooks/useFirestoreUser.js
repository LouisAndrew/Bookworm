import { useState, useEffect } from 'react'

import { db } from '../lib/firebase'

const useFirestoreUser = userFromCookie => {

    const [ user, setUser ] = useState({ })

    const getUserDbData = userFromCookie => {

        if ( !userFromCookie.uid ) return
        const dbRef = db().collection('User').doc(userFromCookie.uid)

        dbRef.get()
            .then(doc => {

                if (doc.exists) {
                    setUser(doc.data())
                } else {

                    const userData = {
                        displayName: userFromCookie.displayName,
                        photoURL: userFromCookie.photoURL,
                        uid: userFromCookie.uid,
                        fireList: [ ]
                    }

                    dbRef.set(userData)
                        .then(() => setUser(userData))
                        .catch(err => console.log(err))
                }
            })
    }

   useEffect(() => {
       //fetch data when there's no user active, and userFromCookie is avail
        if (!user.displayName && user && userFromCookie) {
            getUserDbData(userFromCookie)
        }
   })

   return user
}

export default useFirestoreUser

export const useUserData = uid => {

    const [ user, setUser ] = useState({ })

    const fetchUser = uid => {

        const dbRef = db().collection('User').doc(uid)

        dbRef.get()
            .then(doc => doc.exists && setUser(doc.data()))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        if (!user.uid) {
            fetchUser(uid)
        }
    })

    return user
}