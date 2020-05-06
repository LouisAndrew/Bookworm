import React, { useState, useEffect, useContext } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import useGoogleFont from '../hooks/useGoogleFont'
import Header from './Header'
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

       html {
           scroll-behavior: smooth;
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

           padding: 5vh 15vw;

           min-height: calc( 100vh - 2rem - 3vh );

           &.login {

               padding: 0;
           }

           &.light {

               background-color: #FFF;
               
               h1, h2, h3, h4, h5, h6, a, p, button, span {

                   color: #000;
                   transition: .2s;
               }
           }

           &.dark {

                background-color: #292F36;

                h1, h2, h3, h4, h5, h6, a, p, button, span {

                    color: #fff;
                    transition: .2s;
                }
            }
       }

       @media screen and ( max-width: 840px ) {
           
            #main {

                padding: 5vh 20%;
                margin-bottom: 8vh;
            }
       }

       @media only screen and (max-width: 464px) {
            
            :root {
                font-size: 12px;
            }
            
            #main {

                padding: 5vh;
            }
      }
    `

    useGoogleFont()
    
    return (
        <>
            <Global />
            <ThemeProvider theme={theme}>
                {/* <SearchBar /> */}
                <Nav />
                <Header />
                <div className={themeLight ? 'light' : 'dark'} id='main'>
                    {props.children}
                </div>
            </ThemeProvider>
        </>
    )
}

export default Layout
