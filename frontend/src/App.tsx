import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAuthStore } from './store/auth-store'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Skills from './pages/Skills'
import SkillDetail from './pages/SkillDetail.jsx'
import Docs from './pages/Docs.jsx'
import LoadingSpinner from './components/LoadingSpinner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/skills',
    element: <Skills />,
  },
  {
    path: '/skills/:skillId',
    element: <SkillDetail />,
  },
  {
    path: '/docs',
    element: <Docs />,
  },
])

function App() {
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  )
}

export default App
