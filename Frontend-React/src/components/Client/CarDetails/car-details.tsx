import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiClient from '../../../api/axios';
import type { CarDetails } from './car'

function CarDetailsPage({ id }: { id: number }) {
  const { id: paramId } = useParams();
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/car-detail/${id}`);
        setCarDetails(response.data.data);
      } catch (err) {
        if (err instanceof Error) {
          setLoading(false);
        } else {
          // Handle non-Error errors
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !carDetails) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{error || 'Car details not found'}</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === carDetails.car_images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carDetails.car_images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-28">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="relative aspect-video border border-gray-300 rounded-lg overflow-hidden">
          <img
            src={carDetails.car_images[currentImageIndex].image_url}
            alt={`${carDetails.vehicle_model.brand_name.name} ${carDetails.vehicle_model.name}`}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={previousImage}
              className="bg-gray-700 text-white p-2 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={nextImage}
              className="bg-gray-700 text-white p-2 rounded-full"
            >
              &gt;
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {carDetails.car_images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 p-0 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              {/* {carDetails.vehicle_model.brand_name.name} {carDetails.vehicle_model.name} */}
              {carDetails.name}
            </h1>
            <p className="text-2xl font-semibold text-orange-500 mt-2">
              ${Number(carDetails.price).toLocaleString()}
            </p>
          </div>
          {/* Car Details */}

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Brand Name</p>
              <p className="font-medium">{carDetails.vehicle_model.brand_name.name.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-medium">{carDetails.vehicle_model.name.toLocaleString()} miles</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-medium">{carDetails.year}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Mileage</p>
              <p className="font-medium">{carDetails.mileage.toLocaleString()} miles</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Transmission</p>
              <p className="font-medium">{carDetails.transmission.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Fuel Type</p>
              <p className="font-medium">{carDetails.fuel_type.name}</p>
            </div>
          </div>

          <hr className="my-4" />

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="flex flex-wrap gap-2">
              {carDetails.features.map((feature) => (
                <span
                  key={feature.id}
                  className="px-3 py-1 text-sm bg-gray-200 rounded-full"
                >
                  {feature.name}
                </span>
              ))}
            </div>
          </div>

          {/* Safety Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Safety Features</h2>
            <div className="flex flex-wrap gap-2">
              {carDetails.safety_features.map((feature) => (
                <span
                  key={feature.id}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-full"
                >
                  {feature.name}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 border border-gray-300 p-4 rounded-lg">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Drive Type</p>
              <p className="font-medium">{carDetails.drive_type.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Body Type</p>
              <p className="font-medium">{carDetails.type.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Color</p>
              <p className="font-medium">{carDetails.color}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Doors</p>
              <p className="font-medium">{carDetails.door}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Engine</p>
              <p className="font-medium">{carDetails.cylinder.name} Cylinder</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-medium">{carDetails.car_status.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-video w-full bg-gray-200 animate-pulse rounded-full"></div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-5 w-20 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div>
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-full mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsPage;