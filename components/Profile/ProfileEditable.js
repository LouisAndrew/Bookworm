import React, { useRef, useContext, useState } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../helper/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import { setUserDisplayName } from '../../helper'
import useFireStoreUser from '../../hooks/useFirestoreUser'

export const splitStringFromMessages = (string, message) => {
    return string.split(message)[0]
}

const ProfileEditable = user => {

    const SUCCESS_MESSAGE = 'Display name updated'
    const ERR_MESSAGE = "Changes haven't been saved"

    const ref = useRef()
    const ctx = useContext(UserContext)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ displayName, setDisplayName ] = useState(user.displayName)
    const [ onError, setOnError ] = useState(false)
    const updatedUser = useFireStoreUser({ uid: ctx.user.uid })

    const edit = () => {

        //remove tooltip => in case user is hovering!
        // removeHover()
        document.getElementById('editable').classList.add('active')
        //adding the borderborrom
        ref.current.contentEditable = true
        //set element to be editable!
        setIsEditing(true)
        ref.current.focus()
    }

    const submit = () => {

        const editable = document.getElementById('editable')
        editable.classList.remove('active')

        //remove red border
        if (editable.classList.contains('error')) {
            editable.classList.remove('error')
        }

        if ( onError ) {
            //if before error is occured => delete error message
            setOnError(false)
        }

        nameUpdated()

        ref.current.contentEditable = false
        setIsEditing(false)

        //here submit new name to fs
        const newName = splitStringFromMessages( ref.current.innerText, SUCCESS_MESSAGE )
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

        //if the user changed the name.. but hasn't saved the changes yet!
        if (isEditing && displayName !== ref.current.innerText) {
            editable.classList.add('error')

            if (!onError) {

                setOnError(true)
                createErrorElement()
            }

        } else {

            editable.classList.contains('error') && editable.classList.remove('error')
            setOnError(false)
        }
    }

    const createErrorElement = () => {

        let feedback = document.getElementById('feedback')
        const container = document.getElementById('editable-container')

        //guard clause.. usually there's a bug on firefox where node was not found..
        if ( container ) {
            //if no element is available, create the element.
            if ( !feedback ) {

                feedback = document.createElement('h6')
                feedback.id = 'feedback'
                feedback.contentEditable = false

                container.appendChild(feedback)
            }

            feedback.innerText = ERR_MESSAGE
            feedback.style.color = 'red'
        }
    }

    const nameUpdated = () => {

        let feedback = document.getElementById('feedback')
        const container = document.getElementById('editable-container')
        const editable = document.getElementById('editable')

        //if no element is available, create the element.
        if ( container ) {

            if ( !feedback ) {
                feedback = document.createElement('h6')
                feedback.id = 'feedback'
                feedback.contentEditable = false
    
                container.appendChild(feedback)
            }
            
            feedback.innerText = SUCCESS_MESSAGE
            feedback.style.color = 'green'
            editable.classList.add('success')
    
            setTimeout(() => {
                
                //after 30 seconds, remove the success message
                container.lastChild.isEqualNode(feedback) && container.removeChild(feedback)
                editable.classList.remove('success')
            }, 3000)
        }
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

    return (
        <Editable id='editable-container'>
            <div id='buttons'>
                {isEditing ? 
                    <FontAwesomeIcon onMouseEnter={hoverSubmit} onMouseLeave={removeHover} onClick={submit} id='submit-name' className='icon' icon={faCheck} /> : 
                    <FontAwesomeIcon id='edit' onMouseEnter={hoverEdit} onMouseLeave={removeHover} onClick={edit} className='icon' icon={faPen} />
                }
            </div>
            <div id='editable' onBlur={blur} ref={ref}>{!isEditing && 'Hello'} {displayName} </div>
        </Editable>
    )
}

export default ProfileEditable

const Editable = styled.h3`

    width: 250px;
    
    display: flex;
    flex-flow: row wrap;
    flex-direction: column;
    align-items: flex-start;

    #editable {
        
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

        &.success {

            border-bottom: 2px solid green;
        }

        #feedback {

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