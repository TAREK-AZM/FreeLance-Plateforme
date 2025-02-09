import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: {
    name: "Tarek",
    email: "alex@yogigs.com",
    image: "https://demo.yo-gigs.com/image/show/4/7/LARGE",
  },
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export const useFreelancerStore = create((set) => ({
  freelancers: [
    {
      name: "Francesco",
      role: "Mobile App Maintenance and Optimization Specialist with Expertise in Cross-Platform Development, Bug Fixing, and Performance Enhancement for E-commerce Applications",
      rating: 5.0,
      reviews: 1,
      projects: 3,
      rate: 26.0,
      skills: ["E-commerce", "Shopify", "UX/UI"],
      image: "https://demo.yo-gigs.com/image/show/4/7/MEDIUM",
    },
    {
      name: "Jessica",
      role: "Video SEO Expert and Content Strategy Consultant Specializing in YouTube Optimization, Keyword Research, and Analytics-Driven Campaigns for E-commerce Brands",
      rating: 4.0,
      reviews: 2,
      projects: 2,
      rate: 32.0,
      skills: ["E-commerce", "Shopify", "UX/UI"],
      image: "https://demo.yo-gigs.com/image/show/4/8/MEDIUM",
    },
    {
      name: "Mamie",
      role: "Shopify Designer and E-commerce Solutions Architect with Extensive Experience in Custom Theme Development, Store Setup, and Conversion Rate Optimization",
      rating: 4.0,
      reviews: 1,
      projects: 1,
      rate: 37.0,
      skills: ["E-commerce", "Shopify", "UX/UI"],
      image: "https://demo.yo-gigs.com/image/show/4/42/MEDIUM",
    },
    {
      name: "Alison",
      role: "WordPress Developer and Custom Plugin Specialist with a Focus on Responsive Design, API Integrations, and Scalable Solutions for E-commerce Websites",
      rating: 3.0,
      reviews: 2,
      projects: 2,
      rate: 35.0,
      skills: ["E-commerce", "Shopify", "UX/UI"],
      image: "https://demo.yo-gigs.com/image/show/4/1/MEDIUM",
    },
    {
      name: "Cameron",
      role: "Cloud Security Engineer and Infrastructure Consultant Specializing in AWS, Azure, and Google Cloud Platform with a Focus on Data Protection and Compliance",
      rating: 3.5,
      reviews: 2,
      projects: 2,
      rate: 34.0,
      skills: ["E-commerce", "Shopify", "UX/UI"],
      image: "https://demo.yo-gigs.com/image/show/4/19/MEDIUM",
    },
  ],
  addFreelancer: (freelancer) =>
    set((state) => ({ freelancers: [...state.freelancers, freelancer] })),
  removeFreelancer: (id) =>
    set((state) => ({
      freelancers: state.freelancers.filter((f) => f.id !== id),
    })),
}));

export const useServiceStore = create((set) => ({
  services:  [
    {
      title: "I will create a one product shopify dropshipping store",
      description: "I am 28 years old, been doing Dropshipping/Shopify stores since 2017...",
      price: 15.0,
      image: "https://demo.yo-gigs.com/image/show/39/33/LARGE",
    },
    {
      title: "I will be your social media marketing manager",
      description: "Hello Fiverr Community! I am a Digital Marketer & worked with international businesses...",
      price: 35.0,
      image: "https://demo.yo-gigs.com/image/show/39/31/LARGE",
    },
    {
      title: "I will be your impeccable SEO website content writer",
      description: "Everyone loves content that brings value to your business, and I love to make that happen...",
      price: 20.0,
      image: "https://demo.yo-gigs.com/image/show/39/30/LARGE",
    },
    {
      title: "I will develop a responsive WordPress website",
      description: "Creating visually stunning, SEO-optimized, and fast-loading WordPress websites...",
      price: 40.0,
      image: "https://demo.yo-gigs.com/image/show/39/27/LARGE",
    },
  ],
  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),
  removeService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),
}));

export const useJobPostStore = create((set) => ({
  jobPosts: [],
  addJobPost: (jobPost) =>
    set((state) => ({ jobPosts: [...state.jobPosts, jobPost] })),
  removeJobPost: (id) =>
    set((state) => ({
      jobPosts: state.jobPosts.filter((j) => j.id !== id),
    })),
}));
