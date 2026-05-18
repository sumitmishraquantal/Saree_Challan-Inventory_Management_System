import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardPage from "../pages/dashboard/DashboardPage";
import VendorPage from "../pages/vendors/VendorPage";
import SupplierPage from "../pages/suppliers/SupplierPage";
import ChallanPage from "../pages/challans/ChallanPage";
import ReturnPage from "../pages/returns/ReturnPage";
import LedgerPage from "../pages/ledger/LedgerPage";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/vendors"
          element={<VendorPage />}
        />

        <Route
          path="/suppliers"
          element={<SupplierPage />}
        />

        <Route
          path="/challans"
          element={<ChallanPage />}
        />

        <Route
          path="/returns"
          element={<ReturnPage />}
        />

        <Route
          path="/ledger"
          element={<LedgerPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;