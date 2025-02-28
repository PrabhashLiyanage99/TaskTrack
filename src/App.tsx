import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ToDo from './pages/ToDo'

const App = () => {
  return (
    
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
       </AuthProvider>
      </Router>
  )
}

export default App