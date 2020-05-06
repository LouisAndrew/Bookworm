import React from 'react'
import styled from 'styled-components'

import useComment from '../../hooks/useComment'
import Rev from './Rev'

const RevComments = ({ cid }) => {

    console.log(cid)
    const data = useComment(cid)
    console.log(data)

    return (
        <Wrapper>
           { data.revId && <Rev {...data} />  }
        </Wrapper>
    )
}

export default RevComments

const Wrapper = styled.div`
    
`