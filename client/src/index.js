import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider
      authType = {"cookie"}
      authName = {"_auth"}
      cookieDomain = {window.location.hostname}
      cookieSecure = {false} 
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);