import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalProvider } from './context/GlobalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </GlobalProvider>
  </React.StrictMode>,
)
