import React from 'react';
import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { AuthProvider } from 'contexts/AuthContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from 'react-router-dom';

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <div className='app'>
      <BrowserRouter basename={basename}>
        {/* Wrap all components with <AuthProvider> so that child components can access shared context content */}
        {/* Must be placed inside <BrowserRouter> because AuthProvider uses browser information */}
        <AuthProvider>
          <Routes>
            <Route path='*' element={<HomePage />}></Route>
            <Route path='login' element={<LoginPage />}></Route>
            <Route path='signup' element={<SignUpPage />}></Route>
            <Route path='todos' element={<TodoPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
