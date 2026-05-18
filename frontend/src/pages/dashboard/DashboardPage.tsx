import MainLayout from "../../layouts/MainLayout";

function DashboardPage() {
  return (
    <MainLayout>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Vendors
          </h2>

          <p className="text-4xl font-bold mt-4 text-blue-600">
            2
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Active Challans
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-600">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Pending Returns
          </h2>

          <p className="text-4xl font-bold mt-4 text-red-600">
            0
          </p>
        </div>

      </div>

    </MainLayout>
  );
}

export default DashboardPage;