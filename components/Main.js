import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

const Main = () => {

    const router = useRouter()
    const [ user, setUser ] = useState(Cookie.get('user'))

    useEffect(() => {

        setTimeout(() => {
            if (!user) {
                router.push('/login')
            }
        }, 1000)
    })

    return (
        <div>
            <h2>Main</h2>
        </div>
    )
}

export default Main
