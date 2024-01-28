
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Sidebar from './components/SideBar';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import MusicPlayer from './components/MusicPlayer';
import TopNav from './components/TopNav';
import LikedSongsPage from './pages/LikedSongsPage';
import SearchPage from './pages/SearchPage';
import MessageError from './components/MessageError';


const App = () => {

  return (
    <BrowserRouter >
      <Row >
        <Col md={2} >
          <Sidebar />
        </Col>
        <Col md={10} className='bg-gradient pt-5'>
          <TopNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:query" element={<SearchPage />} />
            <Route path="/artist/:artistName" element={<ArtistPage />} />
            <Route path="/album/:albumName" element={<AlbumPage />} />
            <Route path="/likedSongs" element={<LikedSongsPage />} />
            <Route path='*' element={<MessageError err='404 - Page not found' />} />
          </Routes>
          <MusicPlayer />
        </Col>
      </Row>
    </BrowserRouter>
  );
};

export default App;
