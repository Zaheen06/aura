import { Routes, Route } from 'react-router-dom';
import HomePage    from '../pages/HomePage';
import AboutPage   from '../pages/AboutPage';
import TechPage    from '../pages/TechPage';
import ReviewsPage from '../pages/ReviewsPage';

export default function AppRoutes({ onProductClick, onAddToCart }) {
  return (
    <Routes>
      <Route path="/"         element={<HomePage onProductClick={onProductClick} onAddToCart={onAddToCart} />} />
      <Route path="/about"    element={<AboutPage />} />
      <Route path="/technology" element={<TechPage />} />
      <Route path="/reviews"  element={<ReviewsPage />} />
      {/* Catch-all */}
      <Route path="*"         element={<HomePage onProductClick={onProductClick} onAddToCart={onAddToCart} />} />
    </Routes>
  );
}
