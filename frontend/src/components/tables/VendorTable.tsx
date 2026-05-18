import type { Vendor } from "../../types/vendor";

interface Props {
  vendors: Vendor[];
}

function VendorTable({ vendors }: Props) {
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
          {vendors.map((vendor) => (
            <tr
              key={vendor.id}
              className="border-t"
            >
              <td className="p-3">{vendor.id}</td>
              <td className="p-3">{vendor.name}</td>
              <td className="p-3">{vendor.gst_number}</td>
              <td className="p-3">{vendor.phone}</td>
              <td className="p-3">{vendor.address}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default VendorTable;