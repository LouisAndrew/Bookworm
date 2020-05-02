import React, { useRef, useContext, useState } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../helper/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import { setUserDisplayName } from '../../helper'
import useFireStoreUser from '../../hooks/useFirestoreUser'

const ProfileEditable = user => {

    const ref = useRef()
    const ctx = useContext(UserContext)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ displayName, setDisplayName ] = useState(user.displayName)
    const [ onError, setOnError ] = useState(false)
    const updatedUser = useFireStoreUser({ uid: ctx.user.uid })

    const edit = () => {

        removeHover()
        document.getElementById('editable').classList.add('active')
        ref.current.contentEditable = true
        setIsEditing(true)
        ref.current.focus()
    }

    const submit = () => {

        const editable = document.getElementById('editable')
        editable.classList.remove('active')

        if (editable.classList.contains('error')) {
            editable.classList.remove('error')
        }

        if (onError) {

            setOnError(false)
            const par = document.getElementById('err')
            editable.removeChild(par)
        }

        ref.current.contentEditable = false
        setIsEditing(false)

        const newName = ref.current.innerText

        if (newName !== displayName) {

            setDisplayName(ref.current.innerText)
            setUserDisplayName(ref.current.innerText, ctx.user)
                .then(() => {

                    ctx.addUser(updatedUser)
                    nameUpdated()
                })
        }
    }

    const blur = () => {

        const editable = document.getElementById('editable')

        //if the user changed the name..
        if (isEditing && displayName !== ref.current.innerText) {
            editable.classList.add('error')

            if (!onError) {

                setOnError(true)
                createErrorElement(editable)
            }

        } else {

            editable.classList.remove('error')
            setOnError(false)
        }
    }

    const createErrorElement = span => {

        //create h6 child
        const par = document.createElement('h6')
        //id => access to another function
        par.id = 'err'
        par.innerText = "Changes haven't been saved"
        //uneditable so that user won't be able to modify error message
        par.contentEditable = false
        par.style.color = 'red'

        span.appendChild(par)
    }

    const createHoverElement = text => {

        const tooltip = document.createElement('h6')
        tooltip.innerText = text
        tooltip.id = 'tooltip'
        tooltip.style.width = 'max-content'

        document.getElementById('buttons').appendChild(tooltip)
    }

    const hoverEdit = () => {

        createHoverElement('Edit your display name')
    }

    const hoverSubmit = () => {

        createHoverElement('Submit changes')
    }

    const removeHover = () => {

        const tooltip = document.getElementById('tooltip')
        const buttons = document.getElementById('buttons')

        if (buttons.lastChild === tooltip) {
            buttons.removeChild(tooltip)
        }
    }

    const nameUpdated = () => {

        const par = document.createElement('h6')
        par.innerHTML = 'Display name updated' + '<FontAwesomeIcon icon={faCheck} />'
        par.contentEditable = false
        par.style.color = 'green'

        const editable = document.getElementById('editable')
        editable.appendChild(par)

        setTimeout(() => {
            editable.removeChild(par)
        }, 6000)
    }

    return (
        <Editable id='editable-container'>
            <div id='buttons'>
                {isEditing ? 
                    <FontAwesomeIcon onMouseEnter={hoverSubmit} onMouseLeave={removeHover} onClick={submit} id='submit-name' className='icon' icon={faCheck} /> : 
                    <FontAwesomeIcon id='edit' onMouseEnter={hoverEdit} onMouseLeave={removeHover} onClick={edit} className='icon' icon={faPen} />
                }
            </div>
            <span id='editable' onBlur={blur} ref={ref}>{!isEditing && 'Hello'} {displayName}</span>
        </Editable>
    )
}

export default ProfileEditable

const Editable = styled.h3`

    width: 250px;
    
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;

    span {
        
        transition: .2s;
        font-size: 1.5rem;
        outline: none;

        border-bottom: none;

        &.active {

            border-bottom: 2px solid #000;
        }

        &.error {

            border-bottom: 2px solid red;
        }
    }

    #buttons {

        display: flex;
        align-items: center;
        position: relative;

        #tooltip {

            position: absolute;
            left: 50px;
            padding: 1vh;

            color: #fff;
            background-color: #000;
            border-radius: 15px;
        }

        .icon {

            transition: .2s;
            transform: scale(.8);

            position: relative;
            margin-left: .5em;

            &:hover {

                cursor: pointer;
                transform: scale(1.2);
            }
        }
    }
`
