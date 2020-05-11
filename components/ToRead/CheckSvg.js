import React, { useContext } from 'react'
import styled from 'styled-components'

import Sprite from '../../assets/60fps/sprite_60fps.svg'
import { UserContext } from '../../helper/UserContext'

const CheckSvg = props => {

    const { themeLight } = useContext(UserContext)

    return (
        <Container {...props} $themeLight={themeLight} className={`shapeshifter ${props.isRead && 'play'}`} />
    )
}

export default CheckSvg

const Container = styled.div`
    height: 24px;
    width: 24px;
    background-image: ${props => props.$themeLight ? 'url(/sprite_dark.svg)' : 'url(sprite.svg)'};
`