import api from "../api/api";


export const getLedger =
  async () => {

    const response =
      await api.get("/ledger");

    return response.data;
};