import { NavLink } from "react-router-dom";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../auth/AuthContext";


const allMenus = {

  admin: [

    {
      name: "Dashboard",
      path: "/"
    },

    {
      name: "Vendors",
      path: "/vendors"
    },

    {
      name: "Suppliers",
      path: "/suppliers"
    },

    {
      name: "Challans",
      path: "/challans"
    },

    {
      name: "Returns",
      path: "/returns"
    },

    {
      name: "Ledger",
      path: "/ledger"
    }
  ],


  operator: [

    {
      name: "Dashboard",
      path: "/"
    },

    {
      name: "Challans",
      path: "/challans"
    }
  ],


  warehouse: [

    {
      name: "Dashboard",
      path: "/"
    },

    {
      name: "Returns",
      path: "/returns"
    }
  ],


  accountant: [

    {
      name: "Dashboard",
      path: "/"
    },

    {
      name: "Ledger",
      path: "/ledger"
    },

    {
      name: "Challans",
      path: "/challans"
    }
  ]
};


function Sidebar() {

  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();


  const handleLogout = () => {

    logout();

    navigate("/login");
  };


  // DYNAMIC MENUS
  const menuItems =

    user?.role
      ? allMenus[
          user.role as keyof typeof allMenus
        ]
      : [];


  return (

    <aside className="
      w-64
      bg-blue-700
      text-white
      flex
      flex-col
      min-h-screen
    ">

      {/* LOGO */}
      <div className="
        p-6
        text-2xl
        font-bold
        border-b
        border-blue-500
      ">

        Saree ERP

        {/* ROLE */}
        <p className="
          text-sm
          text-blue-200
          mt-1
        ">
          {user?.role?.toUpperCase()}
        </p>

      </div>


      {/* MENU */}
      <nav className="
        p-4
        flex
        flex-col
        gap-2
      ">

        {menuItems.map((item) => (

          <NavLink

            key={item.path}

            to={item.path}

            className={({ isActive }) =>

              `p-3 rounded transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      </nav>


      {/* LOGOUT */}
      <div className="mt-auto p-4">

        <button

          onClick={handleLogout}

          className="
            w-full
            bg-red-500
            hover:bg-red-600
            text-white
            py-2
            rounded
          "
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;