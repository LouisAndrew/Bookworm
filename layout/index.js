import React, { useState, useEffect, useContext } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import useGoogleFont from '../hooks/useGoogleFont'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import { UserContext } from '../helper/UserContext'
import Nav from './Nav'

const Layout = props => {

    const { themeLight } = useContext(UserContext)

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
        shadow: () => '2px 2px 4px rgba(0, 0, 0, 0.25);',
        // pink: '#FFA987',
        // bg: '#F7EBE8',
        // gray: '#444140',
        // dark: '#1E1E24',

        bg: themeLight ? '#FFF' : '#292F36',
        fg: themeLight ? '#F3F3F3' : '#2E2E2E',
        pink: '#FF715B',
        font: themeLight ? '#000' : '#fff'
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

       h6 {
           font-size: 0.7rem;
       }

       p, button, a {
           font-size: 1rem;
       }

       #main {

           margin-left: 8vh;
           padding: 5vh 10vh;

           min-height: 100vh;

           &.login {

               margin-left: 0;
               padding: 0;
           }

           &.light {

               background-color: #FFF;
               
               h1, h2, h3, h4, h5, h6, a, p, button, span {

                   color: #000;
               }
           }

           &.dark {

                background-color: #292F36;

                h1, h2, h3, h4, h5, h6, a, p, button, span {

                    color: #fff;
                }
            }
       }

       ${'' /* .wrap {
            padding: 0 15%;
       } */}

       @media only screen and (max-width: 464px) {
            
            :root {
                font-size: 12px;
            }

            ${'' /* .wrap {
                padding: 0 5%;
            } */}
                
      }
    `

    useGoogleFont()
    
    return (
        <>
            <Global />
            <ThemeProvider theme={theme}>
                {/* <Navbar /> */}
                <SearchBar />
                <Nav />
                <div className={themeLight ? 'light' : 'dark'} id='main'>
                    {props.children}
                </div>
            </ThemeProvider>
        </>
    )
}

export default Layout
