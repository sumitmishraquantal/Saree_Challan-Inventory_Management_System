import { useEffect, useState } from "react";

import type {
  ChallanReturn
} from "../../types/challanReturn";

import type {
  Challan
} from "../../types/challan";

import {
  getChallans
} from "../../services/challanService";


interface Props {

  onSubmit: (
    returnData: ChallanReturn
  ) => void;
}


function ReturnForm({
  onSubmit
}: Props) {

  const [challans, setChallans] =
    useState<Challan[]>([]);

  const [formData, setFormData] =
    useState<ChallanReturn>({
      challan_id: 0,
      return_date: "",
      returned_quantity:
        "" as unknown as number,
      adjustment_quantity:
        "" as unknown as number,
      remarks: "",
    });


  useEffect(() => {

    fetchChallans();

  }, []);


  const fetchChallans = async () => {

    try {

      const data =
        await getChallans();

      // ONLY ACTIVE/PARTIAL
      const filtered =
        data.filter(
          (challan: Challan) =>
            challan.status !==
            "COMPLETED"
        );

      setChallans(filtered);

    } catch (error) {

      console.error(error);
    }
  };


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    onSubmit({
      ...formData,

      challan_id:
        Number(formData.challan_id),

      returned_quantity:
        Number(
          formData.returned_quantity
        ),

      adjustment_quantity:
        Number(
          formData.adjustment_quantity
        ),
    });

    setFormData({
      challan_id: 0,
      return_date: "",
      returned_quantity:
        "" as unknown as number,
      adjustment_quantity:
        "" as unknown as number,
      remarks: "",
    });
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        p-6
        rounded-lg
        shadow-md
        mb-6
      "
    >

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        <select
          name="challan_id"
          value={formData.challan_id}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >

          <option value="">
            Select Challan
          </option>

          {challans.map((challan) => (

            <option
              key={challan.id}
              value={challan.id}
            >
              {challan.challan_number}
              {" | "}
              Pending:
              {" "}
              {challan.pending_quantity}
            </option>
          ))}

        </select>


        <input
          type="date"
          name="return_date"
          value={formData.return_date}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />


        <input
          type="number"
          name="returned_quantity"
          placeholder="Returned Quantity"
          value={
            formData.returned_quantity
          }
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />


        <input
          type="number"
          name="adjustment_quantity"
          placeholder="Adjustment Quantity"
          value={
            formData.adjustment_quantity
          }
          onChange={handleChange}
          className="border p-3 rounded"
        />


        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            md:col-span-2
          "
        />

      </div>


      <button
        type="submit"
        className="
          mt-4
          bg-blue-600
          text-white
          px-4
          py-2
          rounded
          hover:bg-blue-700
        "
      >
        Create Return Entry
      </button>

    </form>
  );
}

export default ReturnForm;