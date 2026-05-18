import { useEffect, useState } from "react";

import type { Challan } from "../../types/challan";

import type { Vendor } from "../../types/vendor";

import type { Supplier } from "../../types/supplier";

import {
  getVendors
} from "../../services/vendorService";

import {
  getSuppliers
} from "../../services/supplierService";


interface Props {

  onSubmit: (
    challan: Challan
  ) => void;
}


function ChallanForm({
  onSubmit
}: Props) {

  const [vendors, setVendors] =
    useState<Vendor[]>([]);

  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

  const [formData, setFormData] =
    useState<Challan>({
      vendor_id: 0,
      supplier_id: 0,
      quantity: "" as unknown as number,
      unit: "pcs",
      transport_type: "",
      lr_number: "",
      program: "",
      rate: "" as unknown as number,
      sent_date: "",
    });


  useEffect(() => {

    fetchDropdownData();

  }, []);


  const fetchDropdownData = async () => {

    try {

      const vendorData =
        await getVendors();

      const supplierData =
        await getSuppliers();

      setVendors(vendorData);

      setSuppliers(supplierData);

    } catch (error) {

      console.error(error);
    }
  };


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
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

    onSubmit({
      ...formData,
      vendor_id: Number(formData.vendor_id),
      supplier_id: Number(formData.supplier_id),
      quantity: Number(formData.quantity),
      rate: Number(formData.rate),
    });

    setFormData({
      vendor_id: 0,
      supplier_id: 0,
      quantity: "" as unknown as number,
      unit: "pcs",
      transport_type: "",
      lr_number: "",
      program: "",
      rate: "" as unknown as number,
      sent_date: "",
    });
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <select
          name="vendor_id"
          value={formData.vendor_id}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="">
            Select Vendor
          </option>

          {vendors.map((vendor) => (
            <option
              key={vendor.id}
              value={vendor.id}
            >
              {vendor.name}
            </option>
          ))}
        </select>


        <select
          name="supplier_id"
          value={formData.supplier_id}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="">
            Select Supplier
          </option>

          {suppliers.map((supplier) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.name}
            </option>
          ))}
        </select>


        <input
          type="number"
          name="quantity"
          placeholder="Enter Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />


        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="pcs">
            PCS
          </option>

          <option value="meter">
            Meter
          </option>
        </select>


        <input
          type="text"
          name="transport_type"
          placeholder="Transport Type"
          value={formData.transport_type}
          onChange={handleChange}
          className="border p-3 rounded"
        />


        <input
          type="text"
          name="lr_number"
          placeholder="LR Number"
          value={formData.lr_number}
          onChange={handleChange}
          className="border p-3 rounded"
        />


        <input
          type="text"
          name="program"
          placeholder="Program"
          value={formData.program}
          onChange={handleChange}
          className="border p-3 rounded"
        />


        <input
          type="number"
          name="rate"
          placeholder="Enter Rate"
          value={formData.rate}
          onChange={handleChange}
          className="border p-3 rounded"
        />


        <input
          type="date"
          name="sent_date"
          value={formData.sent_date}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Challan
      </button>

    </form>
  );
}

export default ChallanForm;