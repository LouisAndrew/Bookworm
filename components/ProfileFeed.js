import React from 'react'
import styled from 'styled-components'

const ProfileFeed = ({ user }) => {

    console.log(user)

    return (
        <Container>
            <Content>
                <img src={user.photoURL} />
                <h2>{user.displayName} </h2>
            </Content>
        </Container>
    )
}

export default ProfileFeed

const Content = styled.div`
    width: 80%;
    background-color: rebeccapurple;
    border-radius: 15px;
    padding: 5%;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        height: 200px;
        width: 200px;
        border-radius: 50%;
    }

    h2 {
        margin: 3vh 0;
    }
`

const Container = styled.div`
    width: 100%;
    background-color: beige;
    display: flex;
    justify-content: flex-end;
`