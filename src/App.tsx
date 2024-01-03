import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HardwareListPage from './pages/HardwareListPage';
import HardwareCreatePage from './pages/HardwareCreatePage';
import HardwareEditPage from './pages/HardwareEditPage';
import HardwareDetailPage from './pages/HardwareDetailPage';
import { Navbar } from './util/Navbar';
import { darkTheme, lightTheme } from './util/Theme';
import { SnackbarProvider } from './context/SnackbarContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const queryClient = new QueryClient();

  return (
    <Container sx={{ flexGrow: 1, justifyContent: 'flex' }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <SnackbarProvider>
              {' '}
              {/* Wrap your application with SnackbarProvider */}
              <Router>
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<HardwareListPage />} />
                    <Route path="/create" element={<HardwareCreatePage />} />
                    <Route path="/edit/:id" element={<HardwareEditPage />} />
                    <Route path="/detail/:id" element={<HardwareDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </Suspense>
              </Router>
            </SnackbarProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
