import React from 'react'
import UserContextProvider from '../helper/UserContext'
import '../assets/sprite_60fps.css'

const MyApp = ({ Component, pageProps }) => {

    console.log('from app')

    return (
        <UserContextProvider>
            <Component {...pageProps} />
        </UserContextProvider>
        // <Component {...pageProps} />
    )
}

export default MyApp
