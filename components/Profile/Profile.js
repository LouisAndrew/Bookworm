import React from 'react'
import styled from 'styled-components'

import ProfileEditable from './ProfileEditable'

const Profile = ({ user, loggedInUser }) => {

    return (
        <Container className='wrap'>
            <div className='left'>
                {loggedInUser ? <ProfileEditable {...user} /> : <h2>{user.displayName} </h2>}
                <img src={user.photoURL} />
            </div>
        </Container>
    )
}

export default Profile

const Container = styled.div`
    display: flex;
    width: 100%;

    .left {

        padding: 5vh 0;

        img {
            height: 250px;
            width: 250px;

            margin: 5vh 0;
            border-radius: 50%;
        }
    }
`