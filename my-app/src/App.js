import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TopRatedPage from "./pages/TopRatedPage";
import UpcomingPage from "./pages/UpcomingPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/search/:query" element={<SearchPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
