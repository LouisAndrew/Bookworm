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
import Postable from '../basics/Postable'

const BookView = ({ data }) => {

      const [ openSummary, setOpenSummary ] = useState(false)
      const volumeInfo = data && extract(data)
      const bookName = data.volumeInfo.title
      const { themeLight } = useContext(UserContext)
      const info = data.volumeInfo.subtitle

      // const expand = () => {

      //       document.getElementById('expand').classList.toggle('expanded')
      //       setOpenSummary(!openSummary)
      // }

      return (
            <Container>
                  <Content className='wrap'>

                        <Item className='left'>
                              <BookDetails specificBook={data} openSummary={openSummary} bookName={bookName} bookId={data.id} info={data.volumeInfo.subtitle} />
                        </Item>
                        <Item className='right'>
                              {/* <Icon onClick={expand} id='expand' className='icon' icon={caretLeftOutlined} color={themeLight ? 'black' : 'white' } /> */}
                              <Book click={() => {}} {...volumeInfo}  />
                              <Det reviewAvailable={info}>
                                    <div>
                                          <h4>Book Summary: </h4>
                                          <p>{ info ? info : 'No Book Review is Available'} </p>
                                    </div>
                              </Det>
                        </Item>

                  </Content>
            </Container>
      )
}

export default BookView

const Det = styled.div`
      width: 100%;

      border-radius: 15px;
      /* max-height: ${props => props.openSummary ? '100vh' : '0'}; */

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

const Item = styled.div`
      width: 100%;

      /* class names based on components/basics/card */
      &.right {

            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            padding: 0 10%;

            position: relative;

            .book-cont {

                  height: fit-content;
                  margin-bottom: 0;
                  padding-top: 0;
                  margin-top: 0;

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

            &:hover {

                  background-color: ${({ theme }) => theme.bg};
                  cursor: default;
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


const BookDetails = ({ reviews, info, bookId, bookName, openSummary, specificBook }) => {

      const ctx = useContext(UserContext)
      const [ hotReload, setHotReload ] = useState(false)

      const resizeTextArea = e => {

            const el = e.target
            el.style.height = '10px'
            e.target.style.height = `${e.target.scrollHeight}px`
      }

      const rerender = () => {
            setHotReload(true)
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
                  {/* { !openSummary && <h4>Click to open book summary</h4> } */}
                  <Postable specificBook={specificBook} rerender={rerender} />

                  { !hotReload && <RevContainer bookName={bookName} bookId={bookId} /> }
            </>
      )
}