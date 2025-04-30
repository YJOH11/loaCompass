import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <button onClick={() => navigate('/character-search')}>유저 검색</button>
        </nav>
    );
};
