import api from "../api/api";

import type { Challan } from "../types/challan";


export const getChallans = async () => {

  const response = await api.get(
    "/challans"
  );

  return response.data;
};


export const createChallan = async (
  challan: Challan
) => {

  const response = await api.post(
    "/challans",
    challan
  );

  return response.data;
};

export const downloadChallanPdf = async (
  challanId: number
) => {

  const response = await api.get(
    `/challans/${challanId}/pdf`,
    {
      responseType: "blob"
    }
  );

  return response.data;
};