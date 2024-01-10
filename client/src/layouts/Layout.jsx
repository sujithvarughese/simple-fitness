import Navbar from '../components/Navbar.jsx'
import { SimpleGrid } from '@chakra-ui/react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import Register from '../components/Register.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Layout = () => {

  const { user, showRegisterModal } = useGlobalContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/fitness")
    } else {
      navigate("/")
    }
  }, [user])

  return (
    <SimpleGrid>
      {showRegisterModal && <Register />}
      <Navbar />
      <Outlet />
    </SimpleGrid>
  )
}

export default Layout