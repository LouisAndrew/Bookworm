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
      console.log(ctx, 'context')
      const [ rev, setRev ] = useState()
      const [ hotReload, setHotReload ] = useState(false)
      const inputRef = React.createRef()

      // const resizeTextArea = () => {

      //       inputRef.style.height = '1px'
      //       inputRef.style.height = `${25 + e.scrollHeight}px`
      // }

      const resizeTextArea = e => {

            const el = e.target
            el.style.height = '10px'
            e.target.style.height = `${e.target.scrollHeight}px`
      }

      const change = e => {
            setRev(e.target.value)
            resizeTextArea(e)
      }

      // function adjustHeight(textareaElement, minHeight) {
      //       // compute the height difference which is caused by border and outline
      //       var outerHeight = parseInt(window.getComputedStyle(el).height, 10);
      //       var diff = outerHeight - el.clientHeight;
    
      //       // set the height to 0 in case of it has to be shrinked
      //       el.style.height = 0;
    
      //       // set the correct height
      //       // el.scrollHeight is the full height of the content, not just the visible part
      //       el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
      //   }

      const submitReview = e => {
            e.preventDefault()
            submitRev(ctx.user, rev, bookId, bookName)
            
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
                        {/* <input ref={inputRef} onChange={change} placeholder='Post a review' type='textarea' /> */}
                        <textarea placeholder='Post a review' ref={inputRef} onChange={change}>

                        </textarea>
                        <div>
                              <Button onClick={submitReview} color='#fff' bColor='#000' border='3px solid #000' text='Submit' />
                        </div>
                  </WriteRev>
                  { !hotReload && <RevContainer bookName={bookName} bookId={bookId} /> }
            </>
      )
}

const WriteRev = styled.form`
      width: 100%;
      padding: 5% 10%;
      ${({ theme }) => theme.center()};
      justify-content: flex-start;

      #input, textarea {
            width: 100%;
            min-height: 10px;

            padding: 1vh 2vh;
            border: none;
            border-left: 2px solid #000;
            outline: none;

            resize: vertical;
            overflow: hidden;
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