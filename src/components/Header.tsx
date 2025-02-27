import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom'

const Header = () => {
    const { logout } = useAuth();

    return (
        <header className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
            <Link
                to="/todo"
                className="px-4 py-2 rounded hover:bg-gray-700 transition">
                ToDo
            </Link>
            <button 
                onClick={logout}
                className="bg-read-500 px-4 py-2 rounded hover:bg-red-700 transition">
                Logout
            </button>
        </header>
    );
};

export default Header;