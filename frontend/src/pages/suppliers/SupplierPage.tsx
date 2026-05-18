import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import SupplierForm from "../../components/forms/SupplierForm";

import SupplierTable from "../../components/tables/SupplierTable";

import {
  createSupplier,
  getSuppliers,
} from "../../services/supplierService";

import type { Supplier } from "../../types/supplier";

function SupplierPage() {

  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

  const fetchSuppliers = async () => {

    try {

      const data =
        await getSuppliers();

      setSuppliers(data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchSuppliers();

  }, []);

  const handleCreateSupplier = async (
    supplier: Supplier
  ) => {

    try {

      await createSupplier(
        supplier
      );

      fetchSuppliers();

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Supplier Management
      </h1>

      <SupplierForm
        onSubmit={
          handleCreateSupplier
        }
      />

      <SupplierTable
        suppliers={suppliers}
      />

    </MainLayout>
  );
}

export default SupplierPage;