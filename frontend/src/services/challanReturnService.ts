import api from "../api/api";

import type {
  ChallanReturn
} from "../types/challanReturn";

export const createReturnEntry = async (
  returnData: ChallanReturn
) => {

  const response = await api.post(
    "/returns",
    returnData
  );

  return response.data;
};