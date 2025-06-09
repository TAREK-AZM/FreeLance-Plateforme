import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API2; // API Base URL from environment variables

export default function ServiceCard({ service }) {
  return (
    <div className="relative rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Service Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
        <img src={BASE_URL+"/api"+service?.image} alt={service.titre} layout="fill" className="w-full h-full object-cover" />
      </div>

      {/* Service Details */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{service.titre}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>

        {/* Price */}
        <div className="text-green-600 font-bold text-lg">${service.prix}</div>

        {/* View Details Button */}
        <Link to={`/client/services/${service.id}`}>
        <button className="bg-green-600 text-white rounded-full px-4 py-2 w-full mt-2">
          View details
        </button>
        </Link>

        
      </div>
    </div>
  );
}
