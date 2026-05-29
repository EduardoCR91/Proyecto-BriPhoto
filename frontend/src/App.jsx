import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AudiovisualPage from './pages/AudiovisualPage'
import FotografiaPage from './pages/FotografiaPage'
import LocucionPage from './pages/LocucionPage'
import ContactoPage from './pages/ContactoPage'
import AboutPage from './pages/AboutPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'audiovisual', element: <AudiovisualPage /> },
      { path: 'fotografia', element: <FotografiaPage /> },
      { path: 'locucion', element: <LocucionPage /> },
      { path: 'quienes-somos', element: <AboutPage /> },
      { path: 'contacto', element: <ContactoPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
