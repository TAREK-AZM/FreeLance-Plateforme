import { se } from "date-fns/locale";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API2; // Use environment variable for API base URL


export const useAuthStore = create((set) => ({
  isAuthenticated: true,
  user: {
    name: "Tarek",
    email: "alex@yogigs.com",
    image: "https://demo.yo-gigs.com/image/show/4/7/LARGE",
  },
  setUser: (user) => set({ user }),
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
  setFreelancers: (freelancers) => set({ freelancers }),
  addFreelancer: (freelancer) =>
    set((state) => ({ freelancers: [...state.freelancers, freelancer] })),
  removeFreelancer: (id) =>
    set((state) => ({
      freelancers: state.freelancers.filter((f) => f.id !== id),
    })),
}));

export const useServiceStore = create((set) => ({
  services:  [],
    setServices: (services) => set({ services }),
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
