import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CharacterSearch from './pages/CharacterSearch.jsx';
import SassagaeCrawler from './pages/SassagaeCrawler.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/character-search" />} />
                <Route path="/character-search" element={<CharacterSearch />} />
                <Route path="/sassagae-crawler" element={<SassagaeCrawler />} />
            </Routes>
        </Router>
    );
}

export default App;
