import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import VendorForm from "../../components/forms/VendorForm";
import VendorTable from "../../components/tables/VendorTable";

import {
  createVendor,
  getVendors,
} from "../../services/vendorService";

import type { Vendor } from "../../types/vendor";

function VendorPage() {

  const [vendors, setVendors] = useState<Vendor[]>([]);

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleCreateVendor = async (
    vendor: Vendor
  ) => {
    try {
      await createVendor(vendor);
      fetchVendors();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Vendor Management
      </h1>

      <VendorForm
        onSubmit={handleCreateVendor}
      />

      <VendorTable vendors={vendors} />

    </MainLayout>
  );
}

export default VendorPage;