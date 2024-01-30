import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HardwareListPage from './pages/hardware/HardwareListPage';
import HardwareCreatePage from './pages/hardware/HardwareCreatePage';
import HardwareEditPage from './pages/hardware/HardwareEditPage';
import HardwareDetailPage from './pages/hardware/HardwareDetailPage';
import { Navbar } from './components/Navbar';
import { lightTheme } from './util/Theme';
import { SnackbarProvider } from './context/SnackbarContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import ProfilePage from './pages/user/ProfilePage';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import AdminOnlyGuardPage from './pages/guardPages/AdminOnlyGuardPage';
import AdminOrOwnerGuardPage from './pages/guardPages/AdminOrOwnerGuardPage';
import AuthenticatedUserGuardPage from './pages/guardPages/AuthenticatedUserGuardPage';
import UserEditPage from './pages/user/UserEditPage';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const queryClient = useMemo(() => new QueryClient(), []);

  const switchTheme = (currentTheme: Theme) => {
    setTheme(currentTheme);
  };

  return (
    <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>
              {' '}
              <Router>
                <Navbar theme={theme} setTheme={switchTheme} />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/list" element={<HardwareListPage />} />
                    <Route path="/add" element={<HardwareCreatePage />} />
                    <Route path="/edit/:id" element={<HardwareEditPage />} />
                    <Route path="/detail/:id" element={<HardwareDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/user/:id" element={<UserEditPage />} />
                    <Route path="/adminonly" element={<AdminOnlyGuardPage />} />
                    <Route path="/adminorowner" element={<AdminOrOwnerGuardPage />} />
                    <Route path="/authenticatedonly" element={<AuthenticatedUserGuardPage />} />
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
