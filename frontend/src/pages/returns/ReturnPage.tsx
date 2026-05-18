import MainLayout from "../../layouts/MainLayout";

import ReturnForm from "../../components/forms/ReturnForm";

import type {
  ChallanReturn
} from "../../types/challanReturn";

import {
  createReturnEntry
} from "../../services/challanReturnService";

import toast from "react-hot-toast";


function ReturnPage() {

  const handleCreateReturn = async (
    returnData: ChallanReturn
  ) => {

    try {

      await createReturnEntry(
        returnData
      );

      toast.success(
        "Return Entry Created"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Create Return"
      );
    }
  };


  return (
    <MainLayout>

      <h1 className="
        text-3xl
        font-bold
        mb-6
      ">
        Return Entry
      </h1>

      <ReturnForm
        onSubmit={
          handleCreateReturn
        }
      />

    </MainLayout>
  );
}

export default ReturnPage;