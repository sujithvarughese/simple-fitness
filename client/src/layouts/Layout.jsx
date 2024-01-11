import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SimpleGrid } from '@chakra-ui/react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Register from '../components/Register.jsx'
import Footer from '../components/Footer.jsx'
const Layout = () => {

  const { user, showRegisterModal } = useGlobalContext()

  const navigate = useNavigate()

  // when user value changes (retrieved from context), navigate to fitness when user is present, else navigate to public landing page
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/fitness")
    } else {
      navigate("/")
    }
  }, [user])

  return (
    <SimpleGrid maxW="1200px" m="auto">
      {/* Register modal is triggered when Create Account button on landing page is clicked */}
      {showRegisterModal && <Register />}
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>


    </SimpleGrid>
  )
}

export default Layout