import Navbar from '../../components/Client/Layout/Navbar';
import ContactForm from '../../components/Client/contactUs/contact-form';
import ContactInfo from '../../components/Client/contactUs/contact-info';
import LocationMap from '../../components/Client/Layout/LocationMap';
import Footer from '../../components/Client/Layout/Footer';
import AboutUs from '../../components/Client/AboutUs/about-us';
import imageSrc from '../assets/pexels-tdcat-70912.jpg';

export default function aboutPage() {
    return (
        <>
            <Navbar />

            {/* <div className="bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden">
                <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">

                    <img
                        src={imageSrc}
                        alt="Solomon Auto-Sell"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/70" />
                    <div className="relative z-10 flex flex-col w-full h-full"> */}

            <AboutUs />

            {/* </div>
                </div>
            </div> */}

            <Footer />
        </>
    )
}

