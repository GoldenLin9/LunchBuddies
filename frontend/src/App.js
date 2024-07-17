// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Chat from './pages/Chat';

import { AuthProvider } from './context/AuthContext';



function App() {

  return (
    <ChakraProvider>

      <Router>

        <AuthProvider>
          
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Header />
            <Box flex={1}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/chat/:id" element={<Chat />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes></Box>
            <Footer />
          </Box>
          
        </AuthProvider>
        
      </Router>
    </ChakraProvider>
  );
}

export default App;

