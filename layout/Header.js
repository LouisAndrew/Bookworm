import React, { useContext } from 'react'
import styled from 'styled-components'
import lightbulbCflOff from '@iconify/icons-mdi/lightbulb-cfl-off'
import lightbulbCfl from '@iconify/icons-mdi/lightbulb-cfl'
import { Icon, InlineIcon } from '@iconify/react'

import { UserContext } from '../helper/UserContext'

const Header = () => {

    const { user, themeLight, changeTheme } = useContext(UserContext)

    return (
        <Container>
            <Icon id='lighter' onClick={changeTheme} className='icon' icon={ themeLight ? lightbulbCflOff : lightbulbCfl } />
            { user.displayName && <h2>BookWorm</h2> }
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

    .icon {

        height: calc( 30px + 2vh );
        width: calc( 30px + 2vh );

        position: absolute;
        right: 5vh;
        top: 1vh;

        transition: .2s;
        padding: 1vh;
        background-color: ${({ theme }) => theme.bg};
        box-shadow: ${({ theme }) => theme.shadow};
        border-radius: 50%;

        &:hover {

            cursor: pointer;
        }

        &.searching {

            top: 10vh;
        }
    }
`