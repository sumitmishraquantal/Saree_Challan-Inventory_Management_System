import { useState } from "react";
import type { Vendor } from "../../types/vendor";

interface Props {
  onSubmit: (vendor: Vendor) => void;
}

function VendorForm({ onSubmit }: Props) {

  const [formData, setFormData] = useState<Vendor>({
    name: "",
    gst_number: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      name: "",
      gst_number: "",
      phone: "",
      address: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="gst_number"
          placeholder="GST Number"
          value={formData.gst_number}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 rounded"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Vendor
      </button>
    </form>
  );
}

export default VendorForm;