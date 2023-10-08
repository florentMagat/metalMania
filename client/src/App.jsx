import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlbumDetails from './routes/AlbumDetails';
import UpdatePage from './routes/UpdatePage';
import Home from './routes/Home';
import AddAlbum from './routes/AddAlbum';
import { AlbumsProvider } from './Context/Albums';

const App = () => {
  return (
    <AlbumsProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element = { <Home/> } />
          <Route exact path = "/albums/:id" element = { <AlbumDetails/> } />
          <Route exact path = "/albums/add" element = { <AddAlbum/> } />
          <Route exact path = "/albums/:id/update" element = { <UpdatePage/> } />
        </Routes>
      </BrowserRouter>
    </AlbumsProvider>
  );
}

export default App;