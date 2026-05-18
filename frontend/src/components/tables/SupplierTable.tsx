import type { Supplier } from "../../types/supplier";

interface Props {
  suppliers: Supplier[];
}

function SupplierTable({
  suppliers
}: Props) {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">

      <table className="w-full border-collapse">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">GST</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Address</th>
          </tr>
        </thead>

        <tbody>

          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="border-t"
            >
              <td className="p-3">
                {supplier.id}
              </td>

              <td className="p-3">
                {supplier.name}
              </td>

              <td className="p-3">
                {supplier.gst_number}
              </td>

              <td className="p-3">
                {supplier.phone}
              </td>

              <td className="p-3">
                {supplier.address}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SupplierTable;