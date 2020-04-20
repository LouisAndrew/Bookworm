import React from 'react'

const BookPage = ({ bid }) => {

    console.log(bid)

    return (
        <div>
            
        </div>
    )
}

export default BookPage

export const getServerSideProps = async({ params: bid }) => {

    return {
        props: bid
    }
}
