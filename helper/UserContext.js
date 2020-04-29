import React, { useState, useEffect } from 'react'

export const UserContext = React.createContext({ })

export const UserContextConsumer = UserContext.Consumer

const UserContextProvider = props => {
    
    const [ user, setUser ] = useState({ })

    const addUser = user => {
        setUser(user)
        return new Promise((res, rej) => {
            res('success')
        })
    }
    
    const removeUser = () => {
        setUser({ })
    }

    return (
        <UserContext.Provider value={{ user, addUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
