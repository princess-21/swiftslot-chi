// import React from "react"
import { useNavigate } from "react-router-dom"

export default function VendorCard({ vendor }: { vendor: any }) {
  const navigate = useNavigate()

  return (
    <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{vendor.name}</h3>
      <p className="text-gray-500 text-sm mb-3">Timezone: {vendor.timezone}</p>
      <button
        onClick={() => navigate(`/vendors/${vendor.id}`)}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        See Availability
      </button>
    </div>
  )
}
