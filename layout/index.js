import React, { useState, useEffect, useContext } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import useGoogleFont from '../hooks/useGoogleFont'
import Navbar from './Navbar'
import SearchBar from './SearchBar'

const Layout = props => {

    const theme = {
        center: () => (`
            display: flex;
            justify-content: center;
            align-items: center;
        `),
        fitContainer: () => (`
            height: 100%;
            width: 100%;
        `),
        shadow: () => (`
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
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
           font-family: 'Muli', sans-serif;
           font-size: 16px;
       }

       h1 {
           font-size: 2.5rem;
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

       .wrap {
            padding: 0 15%;
       }

       @media only screen and (max-width: 464px) {
            
            :root {
                font-size: 12px;
            }

            .wrap {
                padding: 0 5%;
            }
                
      }
    `

    useGoogleFont()
    
    return (
        <>
            <Global />
            <ThemeProvider theme={theme}>
                <Navbar />
                <SearchBar />
                {props.children}
            </ThemeProvider>
        </>
    )
}

export default Layout
