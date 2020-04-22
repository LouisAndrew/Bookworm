import React from 'react'
import styled from 'styled-components'
import { useUserData } from '../hooks/useFirestoreUser'

const Rev = ({ uid , rev, bookName }) => {

      const user = useUserData(uid)

      console.log(user)

      return (
            <Container>
                  <img src={user.photoURL} />
                  <div>
                        <h4><span>{user.displayName} </span> commented on <span>{bookName} </span> </h4>

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

            p {
                  margin: 5% 0;
            }
      }
`