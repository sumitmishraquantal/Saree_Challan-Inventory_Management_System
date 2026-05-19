import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import VendorPage
  from "./pages/vendors/VendorPage";

import SupplierPage
  from "./pages/suppliers/SupplierPage";

import ChallanPage
  from "./pages/challans/ChallanPage";

import ReturnPage
  from "./pages/returns/ReturnPage";

import LedgerPage
  from "./pages/ledger/LedgerPage";

import LoginPage
  from "./pages/auth/LoginPage";

import ProtectedRoute
  from "./auth/ProtectedRoute";

import DashboardPage
  from "./pages/dashboard/DashboardPage";

import RegisterPage
  from "./pages/auth/RegisterPage";

function App() {

  return (

    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />


      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />


      {/* VENDORS */}
      <Route
        path="/vendors"
        element={
          <ProtectedRoute>
            <VendorPage />
          </ProtectedRoute>
        }
      />


      {/* SUPPLIERS */}
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute>
            <SupplierPage />
          </ProtectedRoute>
        }
      />


      {/* CHALLANS */}
      <Route
        path="/challans"
        element={
          <ProtectedRoute>
            <ChallanPage />
          </ProtectedRoute>
        }
      />


      {/* RETURNS */}
      <Route
        path="/returns"
        element={
          <ProtectedRoute>
            <ReturnPage />
          </ProtectedRoute>
        }
      />


      {/* LEDGER */}
      <Route
        path="/ledger"
        element={
          <ProtectedRoute>
            <LedgerPage />
          </ProtectedRoute>
        }
      />


      {/* DEFAULT */}
      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />

    </Routes>
  );
}

export default App;