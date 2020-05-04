import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import caretLeftOutlined from '@iconify/icons-ant-design/caret-left-outlined'

import Book from '../basics/Book'
import { extract } from '../search/Result'
import Button from '../basics/Button'
import { UserContext } from '../../helper/UserContext'
import { submitRev } from '../../helper'
import RevContainer from '../Reviews/RevContainer'

const BookView = ({ data }) => {

      const [ openSummary, setOpenSummary ] = useState(false)
      const volumeInfo = data && extract(data)
      const bookName = data.volumeInfo.title
      const { themeLight } = useContext(UserContext)

      const expand = () => {

            document.getElementById('expand').classList.toggle('expanded')
            setOpenSummary(!openSummary)
      }

      return (
            <Container>
                  <Content className='wrap'>

                        <Item className='left'>
                              <BookDetails openSummary={openSummary} bookName={bookName} bookId={data.id} info={data.volumeInfo.subtitle} />
                        </Item>
                        <Item className='right'>
                              <Icon onClick={expand} id='expand' className='icon' icon={caretLeftOutlined} color={themeLight ? 'black' : 'white' } />
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

            display: flex;
            align-items: center;
            justify-content: center;

            position: relative;

            .container {
                  flex-direction: column;
                  align-items: center;

                  img {
                        width: 25%;
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

            .icon {

                  height: 30px;
                  width: 30px;

                  position: absolute;
                  left: 25%;
                  transform: translate(-150%, 0) rotate(0deg) !important;
                  transition: .2s;

                  &.expanded {

                        transform: translate(-120%, 0) rotate(180deg) !important;
                  }

                  @media screen and ( max-width: 840px ) {
                        
                        left: 50%;
                        bottom: 0;
                        transform: translate(-50%, 100%) rotate(-90deg) !important;

                        height: 25px;
                        width: 25px;

                        &.expanded {

                              transform: translate(-50%, 50%) rotate(90deg) !important;
                        }
                  }
            }

            .book-cont {

                  &:hover {

                        background-color: ${({ theme }) => theme.bg};
                        cursor: default;
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


const BookDetails = ({ reviews, info, bookId, bookName, openSummary }) => {

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
                  <Det openSummary={openSummary} reviewAvailable={info}>
                        <div>
                              <h4>Book Summary: </h4>
                              <p>{info ? info : 'No Book Review is Available'} </p>
                        </div>
                  </Det>
                  {/* { !openSummary && <h4>Click to open book summary</h4> } */}
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

      border-radius: 15px;
      max-height: ${props => props.openSummary ? '100vh' : '0'};

      background-color: ${({ theme }) => theme.fg};
      box-shadow: ${({ theme }) => theme.shadow};
      transition: .2s;
      overflow: hidden;

      div {

            padding: 5%;
      }

      p {   
            color: ${props => props.reviewAvailable ? '#000' : '#888'};
      }
`