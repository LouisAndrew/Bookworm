import React from 'react'
import styled from 'styled-components'

import useComment from '../../hooks/useComment'
import Rev from './Rev'

const RevComments = ({ cid, rerender }) => {

    const data = useComment(cid)

    return (
        <Wrapper>
           { data.revId && <Rev rerender={rerender} {...data} isComment />  }
        </Wrapper>
    )
}

export default RevComments

const Wrapper = styled.div`
    
    .rv {

        width: 100%;
        margin: 0;
        padding: 0;

        flex-direction: row-reverse;
    }
`