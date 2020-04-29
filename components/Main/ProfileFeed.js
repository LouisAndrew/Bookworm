import React from 'react'
import styled from 'styled-components'

const ProfileFeed = ({ user }) => {

    console.log(user)

    return (
        <Container>
            <div>
                <Content>
                    <img src={user.photoURL} />
                    <h2>{user.displayName} </h2>
                </Content>
            </div>
        </Container>
    )
}

export default ProfileFeed

const Content = styled.div`
    background-color: rgba(233, 233, 233, 0.7);
    border-radius: 15px;
    padding: 5%;

    display: flex;
    align-items: center;

    img {
        height: 175px;
        width: 175px;
        border-radius: 50%;
    }

    h2 {
        margin: 0 3vh;
    }

    @media screen and (max-width: 840px) {
        
        width: 100%;
        flex-direction: row;

        margin-bottom: 10%;

        h2 {
            margin: 0 5%;
        }
    }

    @media screen and (max-width: 464px) {
        
        img {
            height: 125px;
            width: 125px;
        }

        h2 {
            margin: 0 10%;
        }
    }
`

const Container = styled.div`
    width: 100%;
    
    & > div {
        width: 100%;

        display: flex;
        justify-content: flex-end;
    }
`