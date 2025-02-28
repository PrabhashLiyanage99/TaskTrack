import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ToDo from './pages/ToDo'
import ProtectedRoute from './utils/ProtectedRoute'
import Header from './components/Header'

const App = () => {
  return (
    
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/todo" element={<ToDo />} />
            </Route>
          </Routes>
       </AuthProvider>
      </Router>
  )
}

export default App