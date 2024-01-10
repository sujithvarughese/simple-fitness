import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext.jsx'

const Register = () => {

  const { showRegisterModal, setShowRegisterModal } = useAuthContext()

  return (
    <Modal isOpen={showRegisterModal} onClose={setShowRegisterModal}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            Register
          </ModalHeader>

          <ModalBody>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default Register