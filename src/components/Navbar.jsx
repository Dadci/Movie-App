import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="w-full h-[70px] px-4 md:px-16 py-4 flex items-center justify-between fixed top-0 left-0 bg-[#121829]/80 backdrop-blur-md z-50 border-b border-gray-800/50">
            <Link to='/' className="transition-transform hover:scale-110">
                <img src={logo} alt="Logo" className='w-8 h-8' />
            </Link>
            <ul className='flex items-center gap-6'>


                <NavLink href="/watchlist" active={location.pathname === '/watchlist'}>
                    Watchlist
                </NavLink>
            </ul>
        </nav>
    )
}

// NavLink component
const NavLink = ({ href, active, children }) => (
    <Link
        to={href}
        className={`${active
                ? 'text-white font-medium'
                : 'text-[#A8AEBF] hover:text-white'
            } transition-colors text-sm`}
    >
        {children}
    </Link>
)


export default Navbar