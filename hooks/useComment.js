import React, { useEffect, useState } from 'react'

import { db } from '../lib/firebase'

const useComment = cid => {
    const [ comment, setComment ] = useState({ })
    const [ loaded, setLoaded ] = useState(false)
    const dbRef = cid && db().collection('Comments').doc(cid)

    const fetch = async () => {

        const rq = await dbRef.get()
        const doc = await rq.exists ? rq.data() : false

        if ( doc ) {

            setComment(doc)
        }

        //nevertheless set loaded to true
        setLoaded(true)
    }

    useEffect(() => {

        if ( cid ) {
            if ( !comment.revId && !loaded ) {
                fetch()
            }
        }
    })

    //just return when there's data
    return comment
}

export default useComment
