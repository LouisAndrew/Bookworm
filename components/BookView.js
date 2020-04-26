import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import Book from './basics/Book'
import { extract } from './search/Result'
import Button from './basics/Button'
import { UserContext } from '../helper/UserContext'
import { submitRev } from '../helper'
import RevContainer from './RevContainer'

const BookView = ({ data }) => {

      const volumeInfo = data && extract(data)
      const bookName = data.volumeInfo.title

      return (
            <Container>
                  <Content className='wrap'>

                        <Item>
                              <BookDetails bookName={bookName} bookId={data.id} info={data.volumeInfo.subtitle} />
                        </Item>
                        <Item className='right'>
                              <Book {...volumeInfo}  />
                        </Item>

                  </Content>
            </Container>
      )
}

export default BookView

const Item = styled.div`
      width: 100%;

      /* class names based on components/basics/card */
      &.right {

            .container {
                  flex-direction: column;
                  align-items: center;

                  img {
                        width: 50%;
                  }

                  .divider {
                        text-align: center;
                        /* override style rule from Book */
                        margin: 5vh 0;

                        @media screen and (max-width: 840px) {
                              
                              margin-bottom: 0;
                        }
                  }
            }
      }
`

const Content = styled.section`

      width: 100%;
      display: flex;
      
      @media screen and (max-width: 840px) {
            
            flex-direction: column-reverse;
      }
`

const Container = styled.div`

      width: 100%;
      ${({ theme }) => theme.center()}

`


const BookDetails = ({ reviews, info, bookId, bookName }) => {

      const ctx = useContext(UserContext)
      const [ rev, setRev ] = useState()
      const [ hotReload, setHotReload ] = useState(false)
      const inputRef = React.createRef()

      const change = e => {
            setRev(e.target.value)
      }

      const submitReview = e => {
            e.preventDefault()
            submitRev(ctx.user, rev, bookId)
            
            //force the rev container to reload after submitting...
            setHotReload(true)
            setRev('')
            inputRef.current.value = ''
      }

      useEffect(() => {

            if (hotReload) {

                  //set the hot reload off
                  setTimeout(() => {
                        setHotReload(false)
                  }, 200)
            }
      }, [ hotReload ])

      return (
            <>
                  <Det>
                        <h4>{info} </h4>
                  </Det>
                  <WriteRev onSubmit={submitReview}>
                        <input ref={inputRef} onChange={change} placeholder='Post a review' type='text' />
                        <Button onClick={submitReview} color='#fff' bColor='#000' border='3px solid #000' text='Submit' />
                  </WriteRev>
                  { !hotReload && <RevContainer bookName={bookName} bookId={bookId} /> }
            </>
      )
}

const WriteRev = styled.form`
      width: 100%;
      padding: 5% 10%;
      ${({ theme }) => theme.center()};

      input {
            width: 100%;
            padding: 1vh 2vh;
            border: none;
            border-left: 2px solid #000;
            outline: none;
      }
`

const Det = styled.div`
      margin-top: 5vh;
      width: 100%;
      padding: 5%;
      border-radius: 15px;
      color: #000;
      ${({ theme }) => theme.shadow()};
`