import { useState, useEffect } from 'react'

import { db } from '../lib/firebase'

const useFirestoreUser = userFromCookie => {

    const [ user, setUser ] = useState({ })

    const getUserDbData = userFromCookie => {
        
        const dbRef = db().collection('User').doc(userFromCookie.uid)

        dbRef.get()
            .then(doc => {

                if (doc.exists) {
                    setUser(doc.data())
                } else {

                    const userData = {
                        displayName: userFromCookie.displayName,
                        photoURL: userFromCookie.photoURL,
                        uid: userFromCookie.uid
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
