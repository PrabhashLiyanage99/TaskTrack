import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom'
import logo from '../assets/Tasktrack_logo.png';
import off from '../assets/off.svg';

const Header = () => {
    const { logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-md flex justify-between items-center z-50">
            <div className="flex lg:gap-12 sm:gap-2">
                <Link
                    to="/todo"
                    className=" rounded hover:bg-gray-700 transition">
                    <img src={logo} alt="logo" className="w-44 h-10"/>
                </Link>
                <Link
                    to="/todo"
                    className="px-4 py-2 rounded hover:bg-gray-700 transition">
                    ToDo
                </Link>
            </div>
            <button 
                onClick={logout}
                className="bg-read-500 px-4 py-2 rounded hover:bg-red-700 transition flex gap-2">
                <img src={off} alt="" className="w-6 h-6 "/>
                Logout
            </button>
        </header>
    );
};

export default Header;