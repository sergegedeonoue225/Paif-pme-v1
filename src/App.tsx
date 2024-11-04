import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Accueil from './pages/Accueil';
import ScrollToTop from './components/ScrollToTop'; // Ensure the path is correct
import Apropos from './pages/Apropos';
import Repertoire from './pages/Repertoire';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Categories from './pages/Categories';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ScrollToTop component */}
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/Apropos" element={<Apropos />} />
            <Route path="/Repertoire" element={<Repertoire />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
