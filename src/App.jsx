import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ToolsList from './pages/ToolsList';
import VideoToGif from './pages/VideoToGif';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ToolsList />} />
          <Route path="video-to-gif" element={<VideoToGif />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
