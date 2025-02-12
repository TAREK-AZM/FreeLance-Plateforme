import { useEffect, useState } from "react"
import { Heart, MapPin, User, Star } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import CommentForm from "./comment-form"
import { useParams } from "react-router-dom"
import axios from "axios"
const freelancers = [
    {
        id: "1",
        name: "Andrew",
        role: "Retail Staff",
        rating: 4.2,
        reviews: 5,
        projects: 5,
        rate: 43.0,
        location: "Germany",
        memberSince: "2025-04-20 19:44:53",
        description:
            "Proven track record in maintaining accurate customer records, monitoring customer feedback, and achieving a 90% customer satisfaction rate. Skilled in identifying and developing new customer opportunities, preparing and presenting sales presentations, and participating in trade shows resulting in a 30% increase in sales revenue and a 50% increase in successful sales conversions.",
        biography:
            "Highly motivated Sales Associate with 4 years of experience in developing and implementing successful sales strategies resulting in a 25% increase in new customer acquisition and exceeding quarterly sales targets by 15%.",
        image: "https://demo.yo-gigs.com/image/show/4/7/LARGE",
        ratingDistribution: {
            5: 1,
            4: 4,
            3: 0,
            2: 0,
            1: 0,
        },
        feedbacks: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Great freelancer, highly recommended!",
                time: "2023-10-26",
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Good work, but could be better.",
                time: "2023-10-25",
            },
            {
                name: "Peter Jones",
                rating: 5,
                comment: "Excellent service, very professional.",
                time: "2023-10-24",
            },
            {
                name: "Mary Brown",
                rating: 3,
                comment: "Okay, but not the best.",
                time: "2023-10-23",
            },
            {
                name: "David Green",
                rating: 4,
                comment: "Good communication and timely delivery.",
                time: "2023-10-22",
            },
        ],
    },
]

const BASE_URL = import.meta.env.VITE_API2; // Environment variable for API base URL
export default function FreelancerDetails() {
    const { id } = useParams()
    const [freelancer, setFreelancer] = useState(null)

    useEffect(() => {
        const foundFreelancer = freelancers.find((f) => f.id === id)
        setFreelancer(foundFreelancer)
        const fetchFreelancer = async (id) => {

            try {
                const token = localStorage.getItem("token"); // Retrieve token
                const response = await axios.get(`${BASE_URL}/freelancers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token for authentication
                    },
                });
        
                if (response.status === 200) {
                    console.log("✅ Fetched Freelancer:", response.data);
                    setFreelancer(response.data); // Update state with real API data
                } else {
                    console.warn("⚠️ API returned unexpected response:", response);
                }
            } catch (error) {
                console.error("❌ Error fetching freelancer:", error);
            }
        }

        fetchFreelancer(id);

    }, [id])

    const onSubmit = ({ name, rating, comment, time }) => {
        setFreelancer((prev) => ({
            ...prev,
            rating: rating,
            reviews: prev.reviews + 1,
            feedbacks: [
                ...prev.feedbacks,
                {
                    name,
                    rating,
                    comment,
                    time,
                },
            ],
        }))
    }
    if (!freelancer) return <div className="p-6 text-center">Freelancer not found</div>

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="relative w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden">
                    <img src={freelancer.image || "/placeholder.svg"} alt={freelancer.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{freelancer.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">{freelancer.role}</p>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                            <span className="text-[#FFA500] text-xl font-semibold">{freelancer.rating.toFixed(2)}/5</span>
                            <span className="ml-2 text-gray-600">({freelancer.reviews} Feedback)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-6">
                        <div>
                            <div className="text-2xl font-bold">{freelancer.projects}</div>
                            <div className="text-gray-600">Jobs done</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">100%</div>
                            <div className="text-gray-600">Job success</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">${freelancer.rate.toFixed(2)}</div>
                            <div className="text-gray-600">Hourly price</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" className="rounded-full">
                            <Heart className="mr-2 h-5 w-5" />
                            Favorite
                        </Button>
                        <Button className="rounded-full bg-[#12AE65] hover:bg-[#0d8d52]">Invite to job</Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 mt-12">
                <Card className="lg:col-span-2 p-6">
                    <h2 className="text-2xl font-bold mb-6">Expert profile</h2>

                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                        <div className="text-[#12AE65] text-xl font-medium">Retail Assistant</div>
                        <div className="text-[#12AE65] text-xl font-medium">$ {freelancer.rate.toFixed(2)}/hr</div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{freelancer.description}</p>


                    <div className="mt-8 space-y-4">
                        {/* Feedback Section */}
                        <Card className="mt-8 p-6">
                            <h2 className="text-2xl font-bold mb-6">Feedback received (by clients)</h2>

                            <div className="flex flex-col lg:flex-row items-start gap-12">
                                <div className="text-center">
                                    <div className="relative w-32 h-32">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-4xl font-bold text-[#FFA500]">{freelancer.rating.toFixed(2)}</div>
                                        </div>
                                        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="#FFA500"
                                                strokeWidth="10"
                                                strokeDasharray={`${(freelancer.rating / 5) * 283} 283`}
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-2 text-gray-600">Based on {freelancer.reviews} feedback(s)</div>
                                </div>

                                <div className="flex-1">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center gap-4 mb-2">
                                            <div className="w-20">{stars} Stars</div>
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#FFA500]"
                                                    style={{
                                                        width: `${(freelancer.ratingDistribution[stars] / freelancer.reviews) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                            <div className="w-8 text-right">({freelancer.ratingDistribution[stars]})</div>
                                        </div>
                                    ))}
                                    <div className="text-right text-sm text-gray-500 mt-4">
                                        Displaying latest {freelancer.reviews} of {freelancer.reviews}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Reviews */}
                            <div className="mt-8 space-y-4">
                                {freelancer.feedbacks?.map((feedback, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="font-medium">{feedback.name}</div>
                                            <div className="flex items-center text-[#FFA500]">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < feedback.rating ? "fill-current" : "fill-gray-200"}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{feedback.comment}</p>
                                        <div className="text-sm text-gray-500 mt-2">{feedback.time}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </Card>

                <Card className="p-6 h-fit">
                    <h2 className="text-2xl font-bold mb-6">Biography</h2>
                    <p className="text-gray-700 mb-6">{freelancer.biography}</p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <div>
                                <div className="text-sm text-gray-500">from</div>
                                <div>{freelancer.location}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-400" />
                            <div>
                                <div className="text-sm text-gray-500">Member since</div>
                                <div>{new Date(freelancer.memberSince).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>



            {/* Comment Form */}
            <CommentForm onSubmit={onSubmit} />
            {/*  Add your CommentForm component here */}
        </div>
    )
}


