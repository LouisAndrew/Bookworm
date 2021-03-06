import React, { useContext, useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useRouter } from 'next/router'
import { Icon, InlineIcon } from '@iconify/react'
import fireIcon from '@iconify/icons-fa-solid/fire'
import bxsCommentDetail from '@iconify/icons-bx/bxs-comment-detail'
// import anime from 'animejs/lib/anime.es.js'

import { useUserData } from '../../hooks/useFirestoreUser'
import { UserContext } from '../../helper/UserContext'
import { setRevOnFire, updateFirelistFirestore, postComment } from '../../helper'
import { resizeTextArea } from '../basics/Postable'
import Button from '../basics/Button'
import RevComments from './RevComments'


const Rev = ({ uid , rev, bookName, dateCreated, bookId, revId, fireCount, commentList, isComment = false, rerender, cId }) => {

      const setMonth = monthNum => {

            const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
            return months[monthNum]
      }

      const user = uid && useUserData(uid)
      const createdAt = dateCreated && dateCreated.toDate()
      const time = createdAt && `${createdAt.getDate()}-${setMonth(createdAt.getMonth())}-${createdAt.getFullYear()}`

      const router = useRouter()
      const ctx = useContext(UserContext)
      const commentRef = useRef()

      //based on if the user clicked AFTER the el is rendered
      const [ fireClicked, setFireClicked ] = useState( ctx.provideIsFired( isComment ? cId : revId ) )
      const [ commentClicked, setCommentClicked ] = useState(false)

      //double check if the fire is checked => default, unchangeable state
      const [ defaultFireClicked, setDefaultFireClicked ] = useState(ctx.provideIsFired( isComment ? cId : revId ))
      const pathUnclickedColor = ctx.themeLight ? 'black' : 'white'

      //if the default is clicked, (user fired rev on another, past session) => decr fire count by 1=> will be incremented later
      //increment the fire count just based on ui here
      //so no need to get realtime data from firestore
      defaultFireClicked && fireCount--

      // const revAnimation = anime({
      //       targets: '.review',
      //       translateY: [100, 0],
      //       opacity: [0, 1],
      //       autoplay: false,
      //       delay: anime.stagger(100),
      //       easing: 'easeInQuad'
      // })

      // useEffect(() => {

      //       revAnimation.play()
      // }, [ ])

      const clickBook = () => {

            router.push('/books/[bid]', `/books/${bookId}`)
      }

      const clickUser = () => {
            
            if (uid === ctx.user.uid) {
                  router.push('/users')
            } else {
                  router.push('/users/[uid]', `/users/${uid}`)
            }
      }

      const clickFire = () => {

            const isFireClicked = !fireClicked

            //set Fire clicked for UI element
            setFireClicked(isFireClicked)
            //incremment fire count on firestore
            setRevOnFire(revId, isFireClicked)

            //update firelist on context
            ctx.updateFireList(revId, isFireClicked)
                  //then update firelist on user inside firestore
                  .then( () => updateFirelistFirestore(ctx.user, revId, isFireClicked) )
      }

      const clickComment = () => {

            //toggle comments!
            setCommentClicked(!commentClicked)
            document.getElementById(`type-${revId}`).classList.toggle('on')
      }

      const submitComment = e => {

            e.preventDefault()
            const comment = commentRef.current.value
            postComment(ctx.user, revId, comment, bookId, bookName)
            //rerendering to get newest data from firestore
            rerender()
      }
    

      return (
            <Container className='review' revId={revId}>
                  <div className='rv'>
                        <img src={user.photoURL} />
                        <div className='right'>
                              <h4><span onClick={clickUser}>{user.displayName} </span> commented on <span onClick={clickBook}>{bookName} </span></h4>
                              <h6>{time} </h6>
                              <p>{rev} </p>
                              <div className='icons'>
                                    <div className='icon-cont'>
                                          { !isComment && <Icon onClick={clickComment} icon={bxsCommentDetail} className='icon' id={`comment-${revId}`} color={ commentClicked ? 'blue' : pathUnclickedColor } />}
                                          <p>{(!isComment && commentList) && commentList.length}</p>
                                    </div>
                                    <div className='icon-cont'>
                                          <Icon onClick={clickFire} icon={fireIcon} className='icon' id={`fire-${revId}`} color={ fireClicked ? 'red' : pathUnclickedColor } />
                                          <p>{ fireClicked ? fireCount + 1 : fireCount }</p>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <CommentContainer id={`type-${revId}`}>
                        { 
                              (commentList && commentList[0]) && commentList.map(cid => <RevComments rerender={rerender} cid={cid} />)
                        }
                        {
                              !isComment && <CommentArea>
                                                <Textarea ref={commentRef} placeholder='Write a comment' onChange={resizeTextArea} />
                                                <Button onClick={submitComment} color='#fff' text='submit' bColor='pink' />
                                            </CommentArea> 
                        }
                  </CommentContainer>

            </Container>
      )
}

export default Rev

const CommentArea = styled.form`

      width: 100%;

      display: flex;
      margin: 1rem 0;
`

const Textarea = styled.textarea`

      width: 100%;
      min-height: 3rem;

      background-color: ${({ theme }) => theme.fg};
      border: none;
      outline: none;
      border-bottom: 2px solid ${({ theme }) => theme.pink};

      resize: none;
`

const CommentContainer = styled.div`

      max-height: 0;
      overflow: hidden;
      transition: .4s;

      width: 80%;

      &.on {

            max-height: 500vh;

      }

      @media screen and ( max-width: 840px ) {
            
            width: 90%;
      }
`

const Container = styled.div`

      background-color: ${({ theme }) => theme.fg};
      box-shadow: ${({ theme }) => theme.shadow};

      border-radius: 15px;
      margin: 4vh 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .rv {

            width: 100%;
            padding: 5%;
            display: flex;

            img {
                  height: 100px;
                  width: 100px;
                  border-radius: 50%;
            }

            .right {
                  
                  width: 100%;
                  padding: 0 5%;
                  font-weight: normal;

                  h4 span {
                        transition: .2s;

                        &:hover {

                              background-color: #000;
                              color: #fff;
                              cursor: pointer;
                        }
                  }

                  p {
                        margin: 5% 0;
                  }

                  a {
                        text-decoration: none;
                        color: #000;
                        transition: .2s;

                        &:hover {

                              font-weight: bold;
                              text-decoration: underline;
                        }
                  }

                  .icons {

                        display: flex;
                        justify-content: flex-end;
                        width: 100%;

                        .icon-cont {

                              display: flex;
                              align-items: center;

                              margin: 0 2%;

                              .icon {
                                    
                                    path {
                                                transition: .2s;
                                          }

                                    &:hover {
                                          cursor: pointer;

                                          path {
                                                cursor: pointer;
                                          transform: tr;
                                          }
                                    }

                                    &.checked {

                                    }
                              }  

                              p {
                                    margin: 0 10%;
                              }   
                        }

                  }
            }
      }

      @media screen and (max-width: 464px) {
                  
            img {
                  height: 75px;
                  width: 75px;
            }

            div {
                  padding: 0 10%;
            }
      }
`