// src/App.jsx
import AppRouter from './routes/AppRouter';
import './index.css'
import Navbar from "./components/Navbar.jsx";


function App() {
    return (
        <div className="min-h-screen bg-black">
            <AppRouter/>
        </div>
    );
}
export default App;
