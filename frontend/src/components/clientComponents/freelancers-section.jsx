
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../ui/carousel";
import axios from "axios";
import { useFreelancerStore } from "../../store/store";


const Base_URL = import.meta.env.VITE_API2; // API Base URL from environment variables






export default function Freelancers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const setFreelancers = useFreelancerStore((state) => state.setFreelancers);
  const freelancers = useFreelancerStore((state) => state.freelancers);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const freelancers = [
          {
            name: "Francesco",
            role: "Mobile App Maintenance",
            rating: 5.0,
            reviews: 1,
            projects: 3,
            rate: 26.0,
            image: "https://demo.yo-gigs.com/image/show/4/7/MEDIUM",
          },
          {
            name: "Jessica",
            role: "Video SEO Expert",
            rating: 4.0,
            reviews: 2,
            projects: 2,
            rate: 32.0,
            image: "https://demo.yo-gigs.com/image/show/4/8/MEDIUM",
          },
          {
            name: "Mamie",
            role: "Shopify Designer",
            rating: 4.0,
            reviews: 1,
            projects: 1,
            rate: 37.0,
            image: "https://demo.yo-gigs.com/image/show/4/42/MEDIUM",
          },
          {
            name: "Alison",
            role: "WordPress Developer",
            rating: 3.0,
            reviews: 2,
            projects: 2,
            rate: 35.0,
            image: "https://demo.yo-gigs.com/image/show/4/1/MEDIUM",
          },
          {
            name: "Cameron",
            role: "Cloud Security Engineer",
            rating: 3.5,
            reviews: 2,
            projects: 2,
            rate: 34.0,
            image: "https://demo.yo-gigs.com/image/show/4/19/MEDIUM",
          },
          {
            name: "Cameron",
            role: "Cloud Security Engineer",
            rating: 3.5,
            reviews: 2,
            projects: 2,
            rate: 34.0,
            image: "https://demo.yo-gigs.com/image/show/4/19/MEDIUM",
          },
          {
            name: "Cameron",
            role: "Cloud Security Engineer",
            rating: 3.5,
            reviews: 2,
            projects: 2,
            rate: 34.0,
            image: "https://demo.yo-gigs.com/image/show/4/19/MEDIUM",
          },
          {
            name: "Cameron",
            role: "Cloud Security Engineer",
            rating: 3.5,
            reviews: 2,
            projects: 2,
            rate: 34.0,
            image: "https://demo.yo-gigs.com/image/show/4/19/MEDIUM",
          },
        ];
        setFreelancers(freelancers); // Update Zustand store
        const token = localStorage.getItem("token"); // Get the token
        console.log("🔑🔑🔑🔑 Using Token:🔑🔑", token);

        const response = await axios.get(`${Base_URL}/api/client/freelancers`, {
          headers: {
            Authorization: `${token}`, // Attach token in Authorization header
          },
        });

        console.log("✅ Freelancers fetched:", response.data);
        setFreelancers(response.data); // Store freelancers in Zustand
      } catch (error) {
        console.error("❌ Error fetching freelancers:", error);
      }
    };

    fetchFreelancers(); // Call the fetch function when component mounts
  }, [currentSlide]);

  return (
    <section className="py-16 bg-[#FF4338] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Development & IT Freelancer</h2>
          <p className="text-gray-300">
            Contact verified talents to fill the expertise gap in your team.{" "}
            <a href="#" className="underline">
              Browse more
            </a>
          </p>
        </div>

        {/* Our custom Carousel */}
        <Carousel
          opts={{ align: "start" }}
          className="w-full"
          activeSlide={currentSlide}
          onSlideChange={(newIndex) => setCurrentSlide(newIndex)}
        >
          <CarouselContent>
            {freelancers.map((freelancer, index) => (

              <CarouselItem key={index} className="md:basis-1/6 lg:basis-1/6">
                <div className="p-1">
                  <Card className="bg-white text-gray-900">
                    <CardContent className="flex flex-col p-6">
                      <div className="relative mb-4 aspect-[4/3]">
                        <img
                          src={freelancer.image || "/placeholder.svg"}
                          alt={freelancer.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute  right-0 bg-white rounded-full p-1 text-white z-30">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 font-bold text-white-500 rounded-full fill-current bg-[#12AE65]">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>


                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-1">
                        {freelancer.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {freelancer.role}
                      </p>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{freelancer.rating}/5</span>
                        <span className="text-sm text-gray-500">
                          ({freelancer.reviews} Review
                          {freelancer.reviews !== 1 ? "s" : ""})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400">
                            <path
                              fill="currentColor"
                              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z"
                            />
                          </svg>
                          <span className="text-sm">{freelancer.projects}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">
                            Starting at
                          </span>
                          <p className="font-semibold">
                            ${freelancer.rate.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {freelancers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === index
                ? "bg-green-500 w-4"
                : "bg-white/50 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
