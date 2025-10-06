import { Routes, Route } from "react-router-dom";
import VendorsPage from "./pages/VendorsPage";
import VendorDetailPage from "./pages/VendorDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-center mb-6">SwiftSlot Demo</h1>

        <Routes>
          <Route path="/" element={<VendorsPage />} />
          <Route path="/vendors/:id" element={<VendorDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
