import api from "../api/api";
import type { Vendor } from "../types/vendor";

export const getVendors = async () => {
  const response = await api.get("/vendors");
  return response.data;
};

export const createVendor = async (
  vendor: Vendor
) => {
  const response = await api.post(
    "/vendors",
    vendor
  );

  return response.data;
};