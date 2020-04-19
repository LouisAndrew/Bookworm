export const setQueryToUppercase = query => {

    const querySplitted = query.split(' ')
    const joinQuery = querySplitted.map(q => q.toUpperCase()).join('_')

    return joinQuery
}

export const fetchVolumeData = async(query) => {
    const rq = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    const rsp = await rq.ok ? rq.json() : false
    return rsp
}