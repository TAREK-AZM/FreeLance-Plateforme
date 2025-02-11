"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { MapPin, Star, Check } from "lucide-react"

const serviceData = {
    id: "shopify-dropshipping-1",
    title: "I will create a one product shopify dropshipping store",
    postedBy: {
        id: "alex123",
        name: "Alex",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4dvuQZBdERd2wKXlYVj6f02av8Cyxo.png",
        location: "Austria",
        rating: 4.17,
        totalReviews: 5,
    },
    postedDate: "Dec 27, 2024",
    heroImage: "https://demo.yo-gigs.com/image/show-by-id/1794/LARGE?t=1735296458",
    description:
        "I am 25 years old been doing Dropshipping/Shopify stores since 2017. Over the years, I've built several successful businesses in eCommerce and have extensive knowledge of the complete business cycle and a wealth of real world experience. But the best part is I've been able to live the Internet lifestyle, making great money working from home and having the flexibility to do what I want when I want, and I will help you achieve the same. I'm very reliable, detail-oriented and have the eye for a certain something. What are you waiting for? DM me and let's build your future!",
    categories: ["Development & IT Services"],
    expertise: [
        "Web Design Skills",
        "Responsive Design",
        "Product Research",
        "Shopify Theme",
        "Shopify Plus",
        "Ecommerce",
        "Shopify",
        "Shopify templates",
        "Shopify Apps",
        "Shopify SEO",
        "Shopify Development",
        "Dropshipping",
        "Product Listings",
        "FB Ads Manager",
    ],
    location: {
        street: "Steinfelden 27",
        city: "Umberg",
        region: "Carinthia",
        country: "Austria",
    },
    offerings: [
        "A profitable premium liquid theme suitable for your store",
        "Product Research",
        "A Winning Product with compelling description with images",
        "A Running Logo",
        "SEO optimization",
        "Product review",
        "Other competitive features",
        "Facebook/Instagram/TikTok Marketing Strategy",
    ],
    targetAudience: [
        "Restaurants",
        "Jewelry Shop",
        "Hair Salon",
        "Beauty Products or any kind of products",
        "House Renovation website",
        "Barbershop",
        "Lead Generation",
    ],
    pricing: {
        tiers: [
            {
                name: "Silver",
                price: 15.0,
                completion: {
                    months: 3,
                    days: 11,
                },
                totalRevisions: 2,
                features: ["5 pages", "Responsive design", "Content upload", "5 light/5variations"],
            },
            {
                name: "Gold",
                price: 25.0,
                completion: {
                    months: 2,
                    days: 15,
                },
                totalRevisions: 3,
                features: ["8 pages", "Responsive design", "Content upload", "10 light/10variations"],
            },
            {
                name: "Platinum",
                price: 35.0,
                completion: {
                    months: 1,
                    days: 20,
                },
                totalRevisions: 5,
                features: ["12 pages", "Responsive design", "Content upload", "Unlimited variations"],
            },
        ],
        defaultTier: "silver",
    },
}


export default function ShopifyService() {
    const data = serviceData
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold">{data.title}</h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={data.postedBy.avatar} alt={data.postedBy.name} />
                                <AvatarFallback>{data.postedBy.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>Posted by: {data.postedBy.name}</span>
                        </div>
                        <div>Posted: {data.postedDate}</div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
                    {/* Main content */}
                    <div className="space-y-4 ">

                        <section className="w-full h-[400px] overflow-hidden"> 
                            <img
                                src={data.heroImage || "/placeholder.svg"}
                                alt="Development"
                                width={800}
                                height={300}
                                className="rounded-lg w-full h-full object-cover"
                            />
                        </section>


                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">About The Service</h2>
                            <p className="text-muted-foreground">{data.description}</p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.categories.map((category) => (
                                    <Badge key={category} variant="secondary" className="bg-green-50 text-green-700">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.expertise.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-green-50 text-green-700">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">Location</h2>
                            <p className="text-muted-foreground">
                                {`${data.location.street}, ${data.location.city}, ${data.location.region}, ${data.location.country}`}
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">Other Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-2 font-medium">What we offer?</h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        {data.offerings.map((offering) => (
                                            <li key={offering} className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                {offering}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-medium">Target audience for our service</h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        {data.targetAudience.map((audience) => (
                                            <li key={audience} className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                {audience}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <Tabs defaultValue={data.pricing.defaultTier} className="mb-6">
                                <TabsList className="grid w-full grid-cols-3">
                                    {data.pricing.tiers.map((tier) => (
                                        <TabsTrigger key={tier.name.toLowerCase()} value={tier.name.toLowerCase()}>
                                            {tier.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {data.pricing.tiers.map((tier) => (
                                    <TabsContent key={tier.name.toLowerCase()} value={tier.name.toLowerCase()}>
                                        <div className="mb-6">
                                            <div className="text-3xl font-bold">$ {tier.price.toFixed(2)}</div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Completion</span>
                                                <span>
                                                    {tier.completion.months} Month, {tier.completion.days} Day
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Total Revision</span>
                                                <span>{tier.totalRevisions}</span>
                                            </div>
                                        </div>

                                        <div className="my-6">
                                            <h3 className="mb-2 font-medium">What's Included</h3>
                                            <ul className="space-y-2">
                                                {tier.features.map((feature) => (
                                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                                        <Check className="h-4 w-4 text-green-500" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Button className="w-full bg-green-500 hover:bg-green-600">Buy {tier.name}</Button>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={data.postedBy.avatar} alt={data.postedBy.name} />
                                    <AvatarFallback>{data.postedBy.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold">{data.postedBy.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{data.postedBy.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>
                                            {data.postedBy.rating}/5 ({data.postedBy.totalReviews})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

