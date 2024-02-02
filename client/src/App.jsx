import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlbumDetails from './routes/AlbumDetails';
import UpdatePage from './routes/UpdatePage';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import AddAlbum from './routes/AddAlbum';
import Register from './routes/Register'
import { AlbumsProvider } from './Context/Albums';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AlbumsProvider>
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element = { <Home/> } />
          <Route exact path = "/login" element = { <Login/> } />
          <Route exact path = "/dashboard" element = { <Dashboard/> } />
          <Route exact path = "/albums/:id" element = { <AlbumDetails/> } />
          <Route exact path = "/albums/add" element = { <AddAlbum/> } />
          <Route exact path = "/register" element = { <Register/> } />
          <Route exact path = "/albums/:id/update" element = { <UpdatePage/> } />
          <Route exact path ="*" />
        </Routes>
      </BrowserRouter> 
    </AlbumsProvider>
  );
}

export default App;