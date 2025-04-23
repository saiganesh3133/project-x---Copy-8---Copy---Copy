import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './hooks/useAuth'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home.jsx'
import Store from './pages/Store.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Subscribe from './pages/Subscribe.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route
                path="/subscribe"
                element={
                  <PrivateRoute>
                    <Subscribe />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      </AuthProvider>
    </Router>
  )
} 