import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/router'

import LoginHeader from './LoginHeader'

import { Container, changeClass } from './SignIn'
import Button from './Button'

const SignUp = () => {

    const router = useRouter()
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ passrpt, setPassrpt ] = useState('')

    const changeEmail = e => {
        changeClass(e)
        setEmail(e.target.value)
    }

    const changeName = e => {
        changeClass(e)
        setName(e.target.value)
    }

    const changePass = e => {
        changeClass(e)
        setPass(e.target.value)
    }

    const changePassrpt = e => {
        changeClass(e)
        setPassrpt(e.target.value)

        if (pass !== e.target.value) {
            
            console.log(passrpt, 'passrpt')
            console.log(pass, 'pass')
            !e.target.classList.contains('wrong') && e.target.classList.add('wrong')
            document.getElementById('pass-alert').style.display = 'block'
        } else {
            console.log('bener')
            e.target.classList.remove('wrong')
            document.getElementById('pass-alert').style.display = 'none'
        }
    }

    const signUserUp = () => {

        auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                router.push('/')
            })
            .catch(err => {
                document.getElementById('error').innerText = err.message
            })
    }

    return (
        <Wrapper>
            <LoginHeader />
            <div className='sup-form'>
                <h2>Sign Up</h2>
                <h3 id='error'>Error Here</h3>
                <Container onSubmit={signUserUp}>
                    <label htmlFor='name' id='name'>Full Name</label>
                    <input onChange={changeName} type='text' />
                    <label htmlFor='email' id='email'>Email</label>
                    <input onChange={changeEmail} type='email' />
                    <label htmlFor='password' id='password'>Password</label>
                    <input onChange={changePass} type='password' />
                    <label htmlFor='password' id='pass-repeat'>Repeat Password</label>
                    <input onChange={changePassrpt} type='password' />
                    <h5 id='pass-alert'>The repeated password doesn't match</h5>
                </Container>
                <Button onClick={signUserUp} color='#fff' bColor='pink' text='Sign Up' />
            </div>
        </Wrapper>
    )
}

export default SignUp

const Wrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.dark};
    ${({ theme }) => theme.center()};
    flex-flow: column nowrap;

    .sup-form {
        padding: 5%;
        border-radius: 15px;
        ${({ theme }) => theme.center()};
        border: 3px solid #fff;
        flex-flow: column nowrap;

        h3 {
            color: ${({ theme }) => theme.pink};
            margin-bottom: 2vh;
        }

        h2 {
            margin-bottom: 2vh;
            color: #fff;
        }

        h5 {
            align-self: flex-start;
            padding-left: 5%;
            color: ${({ theme }) => theme.pink};
        }

        button {
            margin-top: 2vh;
        }

        #pass-alert {
            display: none;
        }

        .wrong {
            background-color: ${({ theme }) => theme.pink};
        }
    }
`