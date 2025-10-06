import VendorCard from "../components/VendorCard"

const mockVendors = [
  { id: 1, name: "Azure Services", timezone: "Lagos + UTC " },
  { id: 2, name: "Google Cloud Consulting", timezone: "Lagos + UTC " },
  {id: 3, name: "Jiro Enterprise, timezone:", timezone: "Lagos + UTC "}
]

export default function VendorsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Vendors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  )
}
