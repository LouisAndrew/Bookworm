import React from 'react'
import styled from 'styled-components'
import { useUserData } from '../hooks/useFirestoreUser'

const Rev = ({ uid , rev, bookName, dateCreated }) => {

      const setMonth = monthNum => {

            const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
            return months[monthNum]
      }

      const user = useUserData(uid)
      const createdAt = dateCreated.toDate()
      const time = `${createdAt.getDate()}-${setMonth(createdAt.getMonth())}-${createdAt.getFullYear()}`

      return (
            <Container>
                  <img src={user.photoURL} />
                  <div>
                        <h4><span>{user.displayName} </span> commented on <span>{bookName} </span> </h4>
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

            h3 span {
                  font-size: 1.5rem;
                  font-weight: bolder;
            }

            h6 {
                  font-size: .8rem;
            }

            p {
                  margin: 5% 0;
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