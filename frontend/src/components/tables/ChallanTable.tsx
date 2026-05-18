import type { Challan } from "../../types/challan";

import {
  downloadChallanPdf
} from "../../services/challanService";


interface Props {
  challans: Challan[];
}


function ChallanTable({
  challans
}: Props) {


  // STATUS COLOR
  const getStatusColor = (
    status?: string
  ) => {

    switch (status) {

      case "ACTIVE":
        return "bg-blue-100 text-blue-700";

      case "PARTIAL":
        return "bg-yellow-100 text-yellow-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  // DOWNLOAD PDF
  const handleDownloadPdf = async (
    challanId?: number,
    challanNumber?: string
  ) => {

    if (!challanId) return;

    try {

      const pdfBlob =
        await downloadChallanPdf(
          challanId
        );

      const url =
        window.URL.createObjectURL(
          new Blob([pdfBlob])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `${challanNumber}.pdf`
      );

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Download PDF"
      );
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-3 text-left">
                Challan No
              </th>

              <th className="p-3 text-left">
                Vendor
              </th>

              <th className="p-3 text-left">
                Supplier
              </th>

              <th className="p-3 text-left">
                Sent Qty
              </th>

              <th className="p-3 text-left">
                Returned
              </th>

              <th className="p-3 text-left">
                Pending
              </th>

              <th className="p-3 text-left">
                Program
              </th>

              <th className="p-3 text-left">
                Sent Date
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {challans.map((challan) => (

              <tr
                key={challan.id}
                className="
                  border-t
                  hover:bg-gray-50
                "
              >

                <td className="p-3 font-semibold">
                  {challan.challan_number}
                </td>

                <td className="p-3">
                  {challan.vendor_name}
                </td>

                <td className="p-3">
                  {challan.supplier_name}
                </td>

                <td className="p-3">
                  {challan.quantity}
                </td>

                <td className="
                  p-3
                  text-green-700
                  font-medium
                ">
                  {challan.returned_quantity}
                </td>

                <td className="
                  p-3
                  text-red-600
                  font-medium
                ">
                  {challan.pending_quantity}
                </td>

                <td className="p-3">
                  {challan.program}
                </td>

                <td className="p-3">
                  {challan.sent_date}
                </td>

                {/* STATUS */}
                <td className="p-3">

                  <span
                    className={`
                      ${getStatusColor(challan.status)}
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                    `}
                  >
                    {challan.status}
                  </span>

                </td>


                {/* ACTIONS */}
                <td className="p-3">

                  <button
                    onClick={() =>
                      handleDownloadPdf(
                        challan.id,
                        challan.challan_number
                      )
                    }
                    className="
                      bg-blue-600
                      text-white
                      px-3
                      py-1
                      rounded
                      hover:bg-blue-700
                    "
                  >
                    Download PDF
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ChallanTable;