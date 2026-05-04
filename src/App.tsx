/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watch/:id" element={<MovieDetail />} />
        
        {/* Placeholder routes for future implementation */}
        <Route path="/tv-shows" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/popular" element={<Home />} />
        <Route path="/my-list" element={<Home />} />
      </Routes>
    </Router>
  );
}

