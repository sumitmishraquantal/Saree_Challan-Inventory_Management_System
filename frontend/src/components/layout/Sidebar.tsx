import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Vendors",
    path: "/vendors",
  },
  {
    name: "Suppliers",
    path: "/suppliers",
  },
  {
    name: "Challans",
    path: "/challans",
  },
  {
    name: "Returns",
    path: "/returns",
  },
  {
    name: "Ledger",
    path: "/ledger",
  },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen">

      <div className="p-6 text-2xl font-bold border-b border-blue-500">
        Saree ERP
      </div>

      <nav className="p-4 flex flex-col gap-2">

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
    </aside>
  );
}

export default Sidebar;