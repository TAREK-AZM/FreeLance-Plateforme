import { BriefcaseBusiness } from 'lucide-react';
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../ui/carousel";
import axios from "axios";
import { useFreelancerStore } from "../../store/store";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API2; // API Base URL from environment variables

export default function Freelancers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const setFreelancers = useFreelancerStore((state) => state.setFreelancers);
  const freelancers = useFreelancerStore((state) => state.freelancers);

  useEffect(() => {
    const FetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token
        console.log("🔑🔑🔑🔑 Using Token:🔑🔑", token);

        const response = await axios.get(`${BASE_URL}/api/prestataire/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });

        console.log("✅ freelancers fetched:", response.data);
        setFreelancers(response.data); // Store services in Zustand
      } catch (error) {
        console.error("❌ Error fetching services:", error);
      }
    };

    FetchFreelancers(); // Call the fetch function when component mounts
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
                  <Card className="bg-white text-gray-900 h-[450px]">
                    <CardContent className=" relative flex justify-end flex-col p-6 w-full">
                      <div className="relative mb-4 aspect-[4/3]">
                        <img
                          src={BASE_URL + "/api" + freelancer.imageUrl || "/placeholder.svg"}
                          alt={freelancer.prenom}
                          className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute  right-0 bg-white rounded-full p-1 text-white z-30">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 font-bold text-white-500 rounded-full fill-current bg-[#12AE65]">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>


                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-1">
                        {freelancer.nom + " " + freelancer.prenom}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {freelancer?.description?.slice(0, 100)}
                      </p>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {/* <span className="text-sm">{freelancer.rating}/5</span> */}
                        {/* <span className="text-sm text-gray-500">
                          ({freelancer.reviews} Review
                          {freelancer.reviews !== 1 ? "s" : ""})
                        </span> */}
                      </div>

                      <div className="  flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1">
                       

                          {/* <span className="text-sm">{freelancer.projects}</span> */}
                        </div>
                        {/* <div className="text-right">
                         
                          <p className="font-semibold">
                            ${freelancer.rate.toFixed(2)}
                          </p> 
                        </div> */}
                         <Button className="bg-[#12AE65] hover:bg-[#0F9A59] text-white w-full sm:w-auto">
                            View Details
                            <Eye className="ml-2 h-4 w-4" />
                          </Button>
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
