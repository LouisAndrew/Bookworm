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

export const submitRev = (user, rev, bookId, bookName) => {

    const dbRef = db().collection('Reviews').doc()

    const date = new Date()

    const data = {
        bookId,
        rev,
        bookName,
        dateCreated: date,
        uid: user.uid,
    }
    
    dbRef.set(data)
        .catch(err => console.log(err))
}