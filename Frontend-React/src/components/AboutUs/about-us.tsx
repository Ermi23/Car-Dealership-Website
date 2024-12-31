import imageSrc from '../../assets/image.png';

export default function AboutUs() {
    return (
        <div className="container mx-auto px-4 mt-24 mb-12">
            <div className="flex flex-col items-center mb-12">
                <div className="w-32 h-32 relative mb-6">
                    <img
                        src={imageSrc}
                        alt="Car Dealership Logo"
                        className="object-contain rounded-full"
                    />
                </div>
                <h1 className="text-4xl font-bold text-center mb-4">About Solomon Auto Sell</h1>
                <p className="text-xl text-center text-muted-foreground max-w-2xl">
                    Your trusted partner in finding the perfect vehicle since 1985
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="p-6 border border-gray-700 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                    <p className="text-muted-foreground mb-6">
                        Founded in 1985, Premier Auto has been a cornerstone of the automotive industry in our community for over three decades. What started as a small family-owned dealership has grown into a trusted name in car sales and service, all while maintaining our commitment to personalized customer care.
                    </p>
                    <p className="text-muted-foreground">
                        Our journey has been driven by a passion for automobiles and a dedication to exceeding customer expectations. As we've grown, we've embraced new technologies and industry trends, always with the goal of providing the best possible experience for our clients.
                    </p>
                </div>


                <div className="p-6 border border-gray-700 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Wide selection of quality new and pre-owned vehicles</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Expert sales team with deep automotive knowledge</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>State-of-the-art service center with certified technicians</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Transparent pricing and financing options</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-6 text-center">Our Core Values</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Integrity", description: "We believe in honest, ethical business practices in every interaction." },
                        { title: "Excellence", description: "We strive for excellence in our products, services, and customer care." },
                        { title: "Innovation", description: "We embrace new technologies to enhance the car buying and ownership experience." },
                        { title: "Community", description: "We're committed to giving back and supporting our local community." }
                    ].map((value, index) => (
                        <div key={index}>
                            <div className="p-6 border border-gray-300 rounded">
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="mt-16 text-center">
                <h2 className="text-2xl font-semibold mb-4">Visit Us Today</h2>
                <p className="text-muted-foreground mb-6">
                    Experience the Premier Auto difference for yourself. Our showroom is open Monday through Saturday, 9AM to 7PM.
                </p>
                <p className="font-semibold">
                    123 Auto Drive, Cartown, CT 12345 | (555) 123-4567 | info@premierauto.com
                </p>
            </div> */}
        </div>
    )
}
