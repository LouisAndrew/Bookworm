import React from 'react'

import Layout from '../../layout'
import useFirestoreUser from '../../hooks/useFirestoreUser'
import Profile from '../../components/Profile'

const User = ({ uid }) => {

    const user = useFirestoreUser({ uid })

    return (
        <Layout>
            <Profile user={user} />
        </Layout>
    )
}

export default User

export const getServerSideProps = async({ params: { uid: uid } }) => {

    return {
        props: {
            uid
        }
    } 
}