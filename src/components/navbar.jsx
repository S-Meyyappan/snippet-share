import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token"); // check login status

  const handleLogout = () => {
    localStorage.removeItem("Token"); // remove JWT
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="bg-slate-900 px-6 py-4 shadow-md flex items-center justify-between">
      {/* Logo / App Name */}
      <div className="text-sky-400 font-bold text-xl tracking-wide">
        Snippet-Share
      </div>

      {/* Links */}
      <div className="flex space-x-6 items-center">
        {/* Always visible */}
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
          // 🔓 If NOT logged in → show Login
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-300"
              }`
            }
          >
            Login➜]
          </NavLink>
        ) : (
          // 🔒 If logged in → show View, Dashboard, Logout
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
              className="ml-4 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Logout➜]
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
