"use client";

import Image from "next/image";

interface Service {
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="relative rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Service Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
        <Image src={service.image} alt={service.title} layout="fill" className="object-cover" />
      </div>

      {/* Service Details */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{service.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>

        {/* Price */}
        <div className="text-green-600 font-bold text-lg">${service.price.toFixed(2)}</div>

        {/* View Details Button */}
        <button className="bg-green-600 text-white rounded-full px-4 py-2 w-full mt-2">
          View details
        </button>
      </div>
    </div>
  );
}
