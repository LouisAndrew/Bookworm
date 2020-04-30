import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { UserContext } from '../helper/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'

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

const ProfileEditable = user => {

    const ref = useRef()
    const [ isEditing, setIsEditing ] = useState(false)

    const edit = () => {

        document.getElementById('editable').classList.add('active')
        ref.current.contentEditable = true
        setIsEditing(true)
        ref.current.focus()
    }

    const submit = () => {

        ref.current.contentEditable = false
        setIsEditing(false)
    }

    return (
        <Editable id='editable' ref={ref}>{user.displayName} {isEditing ? <FontAwesomeIcon onClick={submit} className='icon' icon={faCheck} /> : <FontAwesomeIcon onClick={edit} className='icon' icon={faPen} />}</Editable>
    )
}

const Editable = styled.h2`

    transition: .2s;

    &.active {

        border-bottom: 2px solid #000;
    }

    .icon {

        transform: scale(.5);
        transition: .2s;

        &:hover {

            cursor: pointer;
            transform: scale(.8);
        }
    }

    #pen {
        
        &:hover {

            cursor: pointer;
        }
    }
`

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