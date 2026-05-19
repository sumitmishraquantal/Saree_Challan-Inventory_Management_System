import {
  useEffect,
  useState
} from "react";

import MainLayout
  from "../../layouts/MainLayout";

import {
  getDashboardStats
} from "../../services/dashboardService";

import toast from "react-hot-toast";


interface DashboardStats {

  total_challans: number;

  active_challans: number;

  partial_challans: number;

  completed_challans: number;

  pending_quantity: number;

  total_vendors: number;

  total_suppliers: number;
}


function DashboardPage() {

  const [stats, setStats] =
    useState<DashboardStats | null>(
      null
    );


  const fetchStats = async () => {

    try {

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Load Dashboard"
      );
    }
  };


  useEffect(() => {

    fetchStats();

  }, []);


  if (!stats) {

    return (
      <MainLayout>

        <div className="
          text-xl
          font-semibold
        ">
          Loading Dashboard...
        </div>

      </MainLayout>
    );
  }


  return (

    <MainLayout>

      <h1 className="
        text-3xl
        font-bold
        mb-6
      ">
        ERP Dashboard
      </h1>


      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">

        {/* TOTAL CHALLANS */}
        <div className="
          bg-white
          p-6
          rounded-lg
          shadow-md
        ">
          <p className="text-gray-500">
            Total Challans
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
          ">
            {stats.total_challans}
          </h2>
        </div>


        {/* ACTIVE */}
        <div className="
          bg-blue-100
          p-6
          rounded-lg
          shadow-md
        ">
          <p className="text-blue-700">
            Active Challans
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
            text-blue-900
          ">
            {stats.active_challans}
          </h2>
        </div>


        {/* PARTIAL */}
        <div className="
          bg-yellow-100
          p-6
          rounded-lg
          shadow-md
        ">
          <p className="text-yellow-700">
            Partial Returns
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
            text-yellow-900
          ">
            {stats.partial_challans}
          </h2>
        </div>


        {/* COMPLETED */}
        <div className="
          bg-green-100
          p-6
          rounded-lg
          shadow-md
        ">
          <p className="text-green-700">
            Completed Challans
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
            text-green-900
          ">
            {stats.completed_challans}
          </h2>
        </div>


        {/* PENDING */}
        <div className="
          bg-red-100
          p-6
          rounded-lg
          shadow-md
        ">
          <p className="text-red-700">
            Pending Quantity
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
            text-red-900
          ">
            {stats.pending_quantity}
          </h2>
        </div>


        {/* VENDORS */}
        <div className="
          bg-purple-100
          p-6
          rounded-lg
          shadow-md
        ">
          <p className="text-purple-700">
            Total Vendors
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
            text-purple-900
          ">
            {stats.total_vendors}
          </h2>
        </div>


        {/* SUPPLIERS */}
        <div className="
          bg-orange-100
          p-6
          rounded-lg
          shadow-md
        ">
          <p className="text-orange-700">
            Total Suppliers
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
            text-orange-900
          ">
            {stats.total_suppliers}
          </h2>
        </div>

      </div>

    </MainLayout>
  );
}

export default DashboardPage;