import {
  useEffect,
  useState
} from "react";

import MainLayout
  from "../../layouts/MainLayout";

import {
  getLedger
} from "../../services/ledgerService";

import type {
  LedgerEntry
} from "../../types/ledger";

import toast from "react-hot-toast";


function LedgerPage() {

  const [entries, setEntries] =
    useState<LedgerEntry[]>([]);


  const fetchLedger = async () => {

    try {

      const data =
        await getLedger();

      setEntries(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Load Ledger"
      );
    }
  };


  useEffect(() => {

    fetchLedger();

  }, []);


  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "ACTIVE":
        return "bg-blue-100 text-blue-700";

      case "PARTIAL":
        return "bg-yellow-100 text-yellow-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  return (

    <MainLayout>

      <h1 className="
        text-3xl
        font-bold
        mb-6
      ">
        Ledger Management
      </h1>


      <div className="
        bg-white
        rounded-lg
        shadow-md
        overflow-hidden
      ">

        <div className="overflow-x-auto">

          <table className="
            w-full
            border-collapse
          ">

            <thead className="
              bg-gray-200
            ">

              <tr>

                <th className="
                  p-3
                  text-left
                ">
                  Challan
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Vendor
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Supplier
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Sent
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Returned
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Pending
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Status
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Date
                </th>

              </tr>

            </thead>


            <tbody>

              {entries.map((entry) => (

                <tr
                  key={
                    entry.challan_number
                  }
                  className="
                    border-t
                    hover:bg-gray-50
                  "
                >

                  <td className="
                    p-3
                    font-semibold
                  ">
                    {entry.challan_number}
                  </td>

                  <td className="p-3">
                    {entry.vendor}
                  </td>

                  <td className="p-3">
                    {entry.supplier}
                  </td>

                  <td className="p-3">
                    {entry.sent_quantity}
                  </td>

                  <td className="
                    p-3
                    text-green-700
                    font-medium
                  ">
                    {entry.returned_quantity}
                  </td>

                  <td className="
                    p-3
                    text-red-600
                    font-medium
                  ">
                    {entry.pending_quantity}
                  </td>

                  <td className="p-3">

                    <span
                      className={`
                        ${getStatusColor(entry.status)}
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                      `}
                    >
                      {entry.status}
                    </span>

                  </td>

                  <td className="p-3">
                    {entry.sent_date}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default LedgerPage;