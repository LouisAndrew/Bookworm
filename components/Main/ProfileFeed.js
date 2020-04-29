import React from 'react'
import styled from 'styled-components'

const ProfileFeed = ({ user }) => {

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
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;

    img {
        height: 175px;
        width: 175px;
        border-radius: 50%;
    }

    h2 {
        margin: 3vh 0;
        width: fit-content;
    }

    @media screen and (max-width: 840px) {
        
        width: 100%;
        flex-direction: row;

        margin-bottom: 10%;

        h2 {
            margin: 5%;
        }
    }

    @media screen and (max-width: 464px) {
        
        img {
            height: 100px;
            width: 100px;
        }

        h2 {
            margin: 0 5%;
        }
    }
`

const Container = styled.div`
    width: 100%;
    
    & > div {
        width: 100%;

        display: flex;
        justify-content: center;
    }
`