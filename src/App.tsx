import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CircularProgress, Container as MuiContainer, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductListPage from './pages/product/ProductListPage';
import ProductCreatePage from './pages/product/ProductCreatePage';
import ProductEditPage from './pages/product/ProductEditPage';
import ProductDetailPage from './pages/product/ProductDetailPage';
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
import MyParticles from './util/MyParticles';
import CustomLoader from './components/CustomLoader';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const queryClient = useMemo(() => new QueryClient(), []);

  const switchTheme = (currentTheme: Theme) => {
    setTheme(currentTheme);
  };

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Navbar theme={theme} setTheme={switchTheme} />
            <CssBaseline />
            <MuiContainer
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
              }}
            >
              <SnackbarProvider>
                <MyParticles theme={theme} />
                <Suspense fallback={<CustomLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/list" element={<ProductListPage />} />
                    <Route path="/add" element={<ProductCreatePage />} />
                    <Route path="/edit/:id" element={<ProductEditPage />} />
                    <Route path="/detail/:id" element={<ProductDetailPage />} />
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
              </SnackbarProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </MuiContainer>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
