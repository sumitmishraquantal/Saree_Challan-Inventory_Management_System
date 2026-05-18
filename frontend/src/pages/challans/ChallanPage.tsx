import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import type { Challan } from "../../types/challan";

import ChallanForm from "../../components/forms/ChallanForm";

import ChallanTable from "../../components/tables/ChallanTable";

import toast from "react-hot-toast";

import {
  createChallan,
  getChallans
} from "../../services/challanService";


function ChallanPage() {

  const [challans, setChallans] =
    useState<Challan[]>([]);

  const [search, setSearch] =
    useState("");


  // FETCH CHALLANS
  const fetchChallans = async () => {

    try {

      const data =
        await getChallans();

      setChallans(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Fetch Challans"
      );
    }
  };


  useEffect(() => {

    fetchChallans();

  }, []);


  // CREATE CHALLAN
  const handleCreateChallan = async (
    challan: Challan
  ) => {

    try {

      await createChallan(
        challan
      );

      toast.success(
        "Challan Created Successfully"
      );

      fetchChallans();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Create Challan"
      );
    }
  };


  // SEARCH FILTER
  const filteredChallans =
    challans.filter((challan) =>
      challan.challan_number
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  // DASHBOARD METRICS
  const totalChallans =
    challans.length;

  const activeChallans =
    challans.filter(
      (c) => c.status === "ACTIVE"
    ).length;

  const partialChallans =
    challans.filter(
      (c) => c.status === "PARTIAL"
    ).length;

  const completedChallans =
    challans.filter(
      (c) => c.status === "COMPLETED"
    ).length;

  const totalPendingQuantity =
    challans.reduce(
      (sum, challan) =>
        sum +
        (challan.pending_quantity || 0),
      0
    );


  return (
    <MainLayout>

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        Challan Management
      </h1>


      {/* DASHBOARD CARDS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-5
        gap-4
        mb-6
      ">

        {/* TOTAL */}
        <div className="
          bg-white
          p-5
          rounded-lg
          shadow-md
        ">
          <p className="text-gray-500">
            Total Challans
          </p>

          <h2 className="
            text-3xl
            font-bold
            mt-2
          ">
            {totalChallans}
          </h2>
        </div>


        {/* ACTIVE */}
        <div className="
          bg-blue-100
          p-5
          rounded-lg
          shadow-md
        ">
          <p className="text-blue-700">
            Active
          </p>

          <h2 className="
            text-3xl
            font-bold
            mt-2
            text-blue-900
          ">
            {activeChallans}
          </h2>
        </div>


        {/* PARTIAL */}
        <div className="
          bg-yellow-100
          p-5
          rounded-lg
          shadow-md
        ">
          <p className="text-yellow-700">
            Partial
          </p>

          <h2 className="
            text-3xl
            font-bold
            mt-2
            text-yellow-900
          ">
            {partialChallans}
          </h2>
        </div>


        {/* COMPLETED */}
        <div className="
          bg-green-100
          p-5
          rounded-lg
          shadow-md
        ">
          <p className="text-green-700">
            Completed
          </p>

          <h2 className="
            text-3xl
            font-bold
            mt-2
            text-green-900
          ">
            {completedChallans}
          </h2>
        </div>


        {/* PENDING STOCK */}
        <div className="
          bg-red-100
          p-5
          rounded-lg
          shadow-md
        ">
          <p className="text-red-700">
            Pending Stock
          </p>

          <h2 className="
            text-3xl
            font-bold
            mt-2
            text-red-900
          ">
            {totalPendingQuantity}
          </h2>
        </div>

      </div>


      {/* CHALLAN FORM */}
      <ChallanForm
        onSubmit={
          handleCreateChallan
        }
      />


      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search Challan Number..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          border
          p-3
          rounded
          mb-4
          w-full
          bg-white
        "
      />


      {/* CHALLAN TABLE */}
      <ChallanTable
        challans={filteredChallans}
      />

    </MainLayout>
  );
}

export default ChallanPage;