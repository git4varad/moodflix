import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import MovieDetail from './pages/MovieDetail.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:media/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
