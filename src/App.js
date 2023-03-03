import React, { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SignPage = lazy(() => import('./pages/SignPage'));

function App() {
  const Fallback = (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color='error' />
    </Box>
  );

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={Fallback}>
                <SignPage />
              </Suspense>
            }
          />
          <Route
            path='/registration'
            element={
              <Suspense fallback={Fallback}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path='/homepage'
            element={
              <Suspense fallback={Fallback}>
                <HomePage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
