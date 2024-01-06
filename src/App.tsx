import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HardwareListPage from './pages/HardwareListPage';
import HardwareCreatePage from './pages/HardwareCreatePage';
import HardwareEditPage from './pages/HardwareEditPage';
import HardwareDetailPage from './pages/HardwareDetailPage';
import { Navbar } from './components/Navbar';
import { darkTheme, lightTheme } from './util/Theme';
import { SnackbarProvider } from './context/SnackbarContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const queryClient = useMemo(() => new QueryClient(), []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <SnackbarProvider>
              {' '}
              <Router>
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/list" element={<HardwareListPage />} />
                    <Route path="/add" element={<HardwareCreatePage />} />
                    <Route path="/edit/:id" element={<HardwareEditPage />} />
                    <Route path="/detail/:id" element={<HardwareDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Routes>
                </Suspense>
                <Footer />
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
