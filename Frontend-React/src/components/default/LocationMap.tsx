import React from 'react'
import { MapPin } from 'lucide-react'

interface LocationMapProps {
    googleMapsUrl: string
    title?: string
}

const LocationMap: React.FC<LocationMapProps> = ({
    googleMapsUrl,
    title = "Visit Our Showroom"
}) => {
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=8.9806,38.7578&zoom=15&size=1200x400&maptype=roadmap&markers=color:red%7C8.9806,38.7578&key=YOUR_GOOGLE_MAPS_API_KEY`

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={staticMapUrl}
                        alt="Our Location"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <button
                            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2"
                            onClick={() => window.open(googleMapsUrl, '_blank')}
                        >
                            <MapPin className="w-5 h-5" />
                            <span>Open in Google Maps</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LocationMap

