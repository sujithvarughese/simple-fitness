import { createBrowserRouter, createRoutesFromElements,  RouterProvider, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx"
import Landing from './pages/Landing.jsx'
import Fitness from './pages/Fitness.jsx'

function App() {

  // Layout is root element
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="fitness" element={<Fitness />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
