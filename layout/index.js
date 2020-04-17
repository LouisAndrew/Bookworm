import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import useGoogleFont from '../hooks/useGoogleFont'
import Navbar from './Navbar'

const Layout = props => {

    const theme = {
        center: () => (`
            display: flex;
            justify-content: center;
            align-items: center;
        `),
        pink: '#FFA987',
        bg: '#F7EBE8',
        gray: '#444140',
        dark: '#1E1E24'
    }

    const Global = createGlobalStyle`
       
       * {
           padding: 0;
           margin: 0;
           box-sizing: border-box;
           font-family: 'Rubik', sans-serif;
           font-size: 16px;
       }

       h1 {
           font-size: 3rem;
       }

       h2 {
           font-size: 2rem;
       }

       h3 {
           font-size: 1.5rem;
       }

       h5 {
           font-size: 0.8rem;
       }

       p, button, a {
           font-size: 1rem;
       }
    `

    useGoogleFont()

    return (
        <>
            <Global />
            <ThemeProvider theme={theme}>
                <Navbar />
                {props.children}
            </ThemeProvider>
        </>
    )
}

export default Layout
