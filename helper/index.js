import { db } from '../lib/firebase'

export const setQueryToUppercase = query => {

    const querySplitted = query.split(' ')
    const joinQuery = querySplitted.map(q => q.toUpperCase()).join('_')

    return joinQuery
}

export const fetchVolumeData = async(query, sortBy, startIndex, maxResult ) => {
    const rq = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&sortBy=${sortBy}&startIndex=${startIndex}&maxResult=${maxResult}`)
    const rsp = await rq.ok ? rq.json() : false
    return rsp
}

export const createUniqueId = async (uuid) => {

    const random = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    let uniqueRevId = uuid || random()
    let dbRef = db().collection('Reviews')

    let doc = await dbRef.doc(uniqueRevId).get()
    
    while ( doc.exists ) {

        console.log(uniqueRevId)

        uniqueRevId = random()
        doc = await dbRef.doc(uniqueRevId).get()
    }

    return await uniqueRevId
}

export const submitRev = async (user, rev, bookId, bookName) => {

    let uniqueRevId = await createUniqueId()
    let dbRef = await db().collection('Reviews').doc(uniqueRevId)

    const date = new Date()
    const fireCount = 0

    const data = {
        fireCount,
        bookId,
        rev,
        bookName,
        dateCreated: date,
        uid: user.uid,
        revId: uniqueRevId
    }
    
    dbRef.set(data)
        .catch(err => console.log(err))
}

export const setUserDisplayName = (newName, user) => {

    const dbRef= db().collection('User').doc(user.uid)

    return dbRef.update({
        displayName: newName
    })
}

export const setRevOnFire = (revId, isFiring) => {

    console.log(isFiring)
    const dbRefBook = db().collection('Reviews').doc(revId)
    const increment = db.FieldValue.increment(1)
    const decrement = db.FieldValue.increment(-1)

    //update => if user is firing, set firecount + 1.
    dbRefBook.update({
        fireCount: isFiring ? increment : decrement
    })
}

export const updateFirelistFirestore = (user, revId, isFiring) => {

    const dbRefUser = db().collection('User').doc(user.uid)

    const add = db.FieldValue.arrayUnion(revId)
    const remove = db.FieldValue.arrayRemove(revId)

    dbRefUser.update({
        fireList: isFiring ? add : remove
    })
}