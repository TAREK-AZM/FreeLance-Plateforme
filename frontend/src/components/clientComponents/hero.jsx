
import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

const slides = [
    "https://sjc.microlink.io/vdt8OfYm3I9slvrKcgwh-gtfQlG2ls4Ez_lkFwnUsolbZLPktFh1qVawpQ7qE3rr6ILObvs2JQJIL3M3tGHlUg.jpeg",
    "https://demo.yo-gigs.com/image/show/21/6/LARGE?t=1711602501",
    "https://demo.yo-gigs.com/image/show/21/10/LARGE?t=1712226712",
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* SLIDER SECTION */}
            <section className="relative overflow-hidden min-h-[400px] md:min-h-[470px]">
                {/* Slides Background */}
                <div className="absolute inset-0">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src={slide || "/placeholder.svg"}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </div>

                {/* DESKTOP OVERLAY (absolute, visible on lg+) */}
                <div className="absolute inset-0 hidden lg:flex items-center px-14 py-10 z-10">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-3xl w-full">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Post a Job & Hire a Verified Professional
                        </h1>

                        {/* Search Bar */}
                        <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                            <div className="relative">
                                <select className="appearance-none bg-transparent border-r border-gray-300 py-3 pl-4 pr-10 text-gray-700">
                                    <option>Freelancers</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-grow py-3 px-4 focus:outline-none"
                            />
                            <button className="flex items-center justify-center gap-2 bg-[#12AE65] rounded-lg p-3 text-white hover:bg-[#0d8d52] transition-colors">
                                <Search className="h-5 w-5" /> Search
                            </button>
                        </div>

                        {/* Popular Jobs */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600">Popular jobs:</span>
                            {["Plumber", "Website Development", "Electrician"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-[#12AE65] hover:text-white"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DOTS NAVIGATION (absolute) */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* MOBILE OVERLAY (static, appears BELOW the slider, visible on < lg) */}
            <div className="lg:hidden px-4 py-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 max-w-3xl w-full mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        Post a Job & Hire a Verified Professional
                    </h1>

                    {/* Search Bar */}
                    <div className="flex flex-col gap-4  rounded-lg shadow-sm overflow-hidden mb-4">
                        <div className="relative flex items-center w-full border border-2 border-gray-400" >
                            <div className="relative ">
                                <select className="appearance-none bg-transparent border-r border-gray-300 py-3 pl-4 pr-10 text-gray-700">
                                    <option>Freelancers</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-grow py-3 px-4 focus:outline-none"
                            />
                        </div>


                        <button className=" flex items-center justify-center gap-2 bg-[#12AE65] rounded-lg p-3 text-black-400 hover:bg-[#07133bd9] hover:text-white">
                            <Search className="h-5 w-5 text-black-400" /> Search
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
}
