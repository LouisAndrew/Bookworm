import React, { useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { useUserData } from '../hooks/useFirestoreUser'
import { UserContext } from '../helper/UserContext'

const Rev = ({ uid , rev, bookName, dateCreated, bookId }) => {

      const setMonth = monthNum => {

            const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
            return months[monthNum]
      }

      const user = useUserData(uid)
      const createdAt = dateCreated.toDate()
      const time = `${createdAt.getDate()}-${setMonth(createdAt.getMonth())}-${createdAt.getFullYear()}`
      const router = useRouter()
      const ctx = useContext(UserContext)

      const clickBook = () => {

            console.log('click!')
            router.push('/books/[bid]', `/books/${bookId}`)
      }

      const clickUser = () => {
            
            if (uid === ctx.user.uid) {
                  router.push('/users')
            } else {
                  router.push('/users/[uid]', `/users/${uid}`)
            }
      }

      return (
            <Container>
                  <img src={user.photoURL} />
                  <div>
                        <h4><span onClick={clickUser}>{user.displayName} </span> commented on <span onClick={clickBook}>{bookName} </span></h4>
                        <h6>{time} </h6>
                        <p>{rev} </p>
                  </div>
            </Container>
      )
}

export default Rev

const Container = styled.div`
      padding: 5%;
      display: flex;
      ${({ theme }) => theme.shadow()};
      border-radius: 15px;
      margin: 2vh 0;

      img {
            height: 100px;
            width: 100px;
            border-radius: 50%;
      }

      div {
            
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

            h6 {
                  font-size: .8rem;
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