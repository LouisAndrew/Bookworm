import React, { useEffect } from 'react'

const useGoogleFont = () => {

    useEffect(() => {

        const font = document.createElement('link')

        font.href = 'https://fonts.googleapis.com/css2?family=Rubik&display=swap'
        font.rel = 'stylesheet'

        document.head.appendChild(font)

        return () => {
            document.head.removeChild(font)
        }
    })
}

export default useGoogleFont
