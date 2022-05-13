import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyle from './styles/global';

import Login from './pages/Login';
import Profile from './pages/Profile';
import SocialLogin from "./pages/SocialLogin";
import ContextProvider, { AppContext } from './utils/Context';
import { AuthenticatedRoute, UnauthenticatedRoute } from './utils/CustomRoutes';

const queryClient = new QueryClient();

export interface IAppProps {};

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Routes>
            <Route path='/' element={
              <UnauthenticatedRoute>
                <Login />
              </UnauthenticatedRoute>
            } />
            <Route path='/profile' element={
              <AuthenticatedRoute>
                <Profile />
              </AuthenticatedRoute>
            } />
            <Route path='/social-login' element={
              <UnauthenticatedRoute>
                <SocialLogin />
              </UnauthenticatedRoute>
            } />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
