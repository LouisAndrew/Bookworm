import React from 'react'
import styled from 'styled-components'

import Sprite from '../../assets/60fps/sprite_60fps.svg'

const CheckSvg = () => {

    const click = e => {
        
        const el = e.target.classList
        // if ( el.contains('play') ) el.replace('play', 'unplay')
        // else if ( el.contains('unplay') ) el.replace('unplay', 'play')
        // else el.add('play')
        el.toggle('play')
    }

    return (
        <Container className='shapeshifter' onClick={click} />
    )
}

export default CheckSvg

const Container = styled.div`
    height: 24px;
    width: 24px;
    background-image: url('/sprite-check.svg');
`