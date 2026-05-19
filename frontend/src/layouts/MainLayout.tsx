import type { ReactNode } from "react";

import Sidebar from "../components/layout/Sidebar";


interface Props {
  children: ReactNode;
}


function MainLayout({
  children
}: Props) {

  return (

    <div className="
      flex
      min-h-screen
      bg-gray-100
    ">

      <Sidebar />

      <div className="flex-1">

        <header className="
          bg-white
          shadow
          px-6
          py-4
        ">
          <h1 className="
            text-2xl
            font-bold
            text-gray-800
          ">
            Saree Challan Management System
          </h1>
        </header>

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;