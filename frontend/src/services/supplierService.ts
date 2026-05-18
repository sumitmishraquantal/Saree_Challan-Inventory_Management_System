import api from "../api/api";

import type { Supplier } from "../types/supplier";


export const getSuppliers = async () => {

  const response = await api.get(
    "/suppliers"
  );

  return response.data;
};


export const createSupplier = async (
  supplier: Supplier
) => {

  const response = await api.post(
    "/suppliers",
    supplier
  );

  return response.data;
};