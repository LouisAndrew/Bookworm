import React, { useContext } from 'react'
import styled from 'styled-components'

import Book from './basics/Book'
import { extract } from './search/Result'
import Button from './basics/Button'
import { UserContext } from '../helper/UserContext'
import { submitRev } from '../helper'

const BookView = ({ data, dbData }) => {

      console.log(data, 'data')
      console.log(dbData, 'dbData')

      const volumeInfo = data && extract(data)

      return (
            <Container>
                  <Content className='wrap'>

                        <Item>
                              <BookDetails bookId={data.id} info={data.volumeInfo.subtitle} />
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
                  }
            }
      }
`

const Content = styled.section`

      width: 100%;
      display: flex;
  
`

const Container = styled.div`

      width: 100%;
      ${({ theme }) => theme.center()}
`


const BookDetails = ({ reviews, info, bookId }) => {
      const ctx = useContext(UserContext)

      const submitReview = e => {
            e.preventDefault()
            submitRev()
      }

      return (
            <>
                  <Det>
                        <h4>{info} </h4>
                  </Det>
                  <WriteRev onSubmit={submitReview}>
                        <input placeholder='Post a review' type='text' />
                        <Button onClick={submitReview} color='#fff' bColor='#000' border='3px solid #000' text='Submit' />
                  </WriteRev>
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