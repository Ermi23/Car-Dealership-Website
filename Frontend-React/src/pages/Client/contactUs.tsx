import Navbar from '../../components/Client/Layout/Navbar';
import ContactForm from '../../components/Client/contactUs/contact-form';
import ContactInfo from '../../components/Client/contactUs/contact-info';
import LocationMap from '../../components/Client/Layout/LocationMap';
import Footer from '../../components/Client/Layout/Footer';
import imageSrc from '../../assets/pexels-tdcat-70912.jpg';

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <img
            src={imageSrc}
            alt="Solomon Auto-Sell"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/70" />
          <div className="relative z-10 flex flex-col w-full h-full">
            <h1 className="text-4xl font-bold text-center text-white mt-12 mb-12">Contact Us</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>


          <div className="mt-20 py-12">
            <LocationMap
              googleMapsUrl="https://maps.app.goo.gl/EjSfQNL6LRKn9wVr9"
              title="Visit Our Showroom"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

