import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  ArrowRightOnRectangleIcon, 
  ArrowLeftOnRectangleIcon, 
  Bars3Icon, 
  XMarkIcon 
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token"); // check login status
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("Token"); // remove JWT
    navigate("/login"); // redirect to login page
    setMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 px-6 py-4 shadow-md flex items-center justify-between relative">
      {/* Logo / App Name */}
      <div className="flex items-center space-x-2">
      <img 
        src="/snippetsharee.png" 
        alt="Snippet Share Logo" 
        className="w-8 h-8 object-contain"
      />
      <span className="text-sky-400 font-bold text-xl tracking-wide">
        Snippet-Share
      </span>
      </div>
    
      {/* Hamburger Button (mobile) */}
      <button 
        className="md:hidden text-gray-300 hover:text-sky-300 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Links (desktop) */}
      <div className="hidden md:flex space-x-6 items-center">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
            }`
          }
        >
          Home
        </NavLink>

        {!token ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
              }`
            }
          >
            Login
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
                }`
              }
            >
              Add
            </NavLink>
            <NavLink
              to="/view"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
                }`
              }
            >
              View
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
                }`
              }
            >
              Dashboard
            </NavLink>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Logout
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900 shadow-md flex flex-col items-start px-6 py-4 space-y-3 md:hidden z-50">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block text-sm font-medium transition-colors ${
                isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
              }`
            }
          >
            Home
          </NavLink>

          {!token ? (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                  isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
                }`
              }
            >
              Login
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/add"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium transition-colors ${
                    isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
                  }`
                }
              >
                Add
              </NavLink>
              <NavLink
                to="/view"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium transition-colors ${
                    isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
                  }`
                }
              >
                View
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium transition-colors ${
                    isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Logout
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
