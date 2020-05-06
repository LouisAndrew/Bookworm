import React, { useContext } from 'react'
import styled from 'styled-components'
import lightbulbCflOff from '@iconify/icons-mdi/lightbulb-cfl-off'
import lightbulbCfl from '@iconify/icons-mdi/lightbulb-cfl'
import { Icon, InlineIcon } from '@iconify/react'

import { UserContext } from '../helper/UserContext'
import SearchBar from './SearchBar'

const Header = () => {

    const { user, themeLight, changeTheme } = useContext(UserContext)

    return (
        <Container loggedIn={user.displayName}>
            { user.displayName && <SearchBar /> }
            <div className='floating'>
                { user.displayName && <h2>BookWorm</h2> }
                <Icon id='lighter' onClick={changeTheme} className='icon' icon={ themeLight ? lightbulbCflOff : lightbulbCfl } />
            </div>
        </Container>
    )
}

export default Header

const Container = styled.header`

    width: 100%;
    min-height: calc( 2rem + 3vh );

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.font};
    padding: 1vh 0;

    .floating {

        position: absolute;
        right: 5vh;
        top: 1vh;

        display: flex;
        align-items: center;
        padding: 1vh;
    
        background-color: ${({ theme }) => theme.bg};
        box-shadow: ${({ theme }) => theme.shadow};
        border-radius: 15px;

        .icon {

            height: calc( 30px + 2vh );
            width: calc( 30px + 2vh );
            padding: 1vh;

            transition: .2s;
            border-left: ${props => props.loggedIn && `2px solid ${props.theme.font}`};

            &:hover {

                cursor: pointer;
            }

            &.searching {

                top: 10vh;
            }

            @media screen and ( max-width: 464px ) {
                
                top: 3vh;
            }
        }

        h2 {

            padding: 1vh;
        }
    }
`