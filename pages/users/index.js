import { useContext } from 'react'

import Layout from '../../layout'
import Profile from '../../components/Profile/Profile'
import { UserContext } from '../../helper/UserContext'

const ProfilePage = () => {

    const { user } = useContext(UserContext)

    return (
        <Layout>
            <Profile loggedInUser user={user} />
        </Layout>
    )
}

export default ProfilePage