import React, { useState, useEffect } from 'react'

export const UserContext = React.createContext({ })

export const UserContextConsumer = UserContext.Consumer

const UserContextProvider = props => {
    
    const [ user, setUser ] = useState({ })
    const [ fireList, setFireList ] = useState([ ])
    const [ themeLight, setThemeLight ] = useState(true)
    const [ bookList, setBookList ] = useState([ ])

    const addUser = user => {

        setUser(user)
        //retrieving firelist from user => no need to fetch from fs every request.
        setFireList(user.fireList)
        setBookList(user.bookList)
        return new Promise((res, rej) => {
            res('success')
        })
    }
    
    const removeUser = () => {
        setUser({ })
    }

    const updateFireList = (revId, isFired) => {

        //temporary container for firelist!
        let temp = fireList

        if ( !revId ) return

        if ( isFired ) {

            temp = [...temp, revId]
        } else {

            const index = temp.indexOf(revId)
            index > -1 && temp.splice(index, 1)
        }

        setFireList(temp)
        
        //always succeed
        return new Promise((res, rej) => {
            res('Success updating')
        })
    }

    const updateBookList = ( bookId, isAdding ) => {

        let temp = bookList || [ ]
        
        if ( !bookId ) return

        if ( isAdding ) {

            temp = [...temp, bookId]
        } else {

            const index = temp.indexOf(bookId)
            index > -1 && temp.splice(index, 1)
        }

        setBookList(temp)
    }

    const changeTheme = () => {
        setThemeLight(!themeLight)
    }

    const provideIsFired = revId => fireList.indexOf(revId) > -1 ? true : false

    return (
        <UserContext.Provider value={{ user, fireList, themeLight, bookList, addUser, removeUser, updateFireList, provideIsFired, changeTheme, updateBookList }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
