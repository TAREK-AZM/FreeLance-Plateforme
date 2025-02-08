import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    user: any; // Replace 'any' with your user type
    login: (userData: any) => void;
    logout: () => void;
}

interface FreelancerState {
    freelancers: any[]; // Replace 'any' with your freelancer type
    addFreelancer: (freelancer: any) => void;
    removeFreelancer: (id: string) => void;
}

interface ServiceState {
    services: any[]; // Replace 'any' with your service type
    addService: (service: any) => void;
    removeService: (id: string) => void;
}

interface JobPostState {
    jobPosts: any[]; // Replace 'any' with your job post type
    addJobPost: (jobPost: any) => void;
    removeJobPost: (id: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: true,
    user: null,
    login: (userData) => set({ isAuthenticated: true, user: userData }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));

export const useFreelancerStore = create<FreelancerState>((set) => ({
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
        {
            name: "Francesco",
            role: "Mobile App Maintenance and Performance Optimization Expert with Advanced Skills in Debugging, Code Refactoring, and User Experience Enhancement for High-Traffic Applications",
            rating: 5.0,
            reviews: 1,
            projects: 3,
            rate: 26.0,
            skills: ["E-commerce", "Shopify", "UX/UI"],
            image: "https://demo.yo-gigs.com/image/show/4/7/MEDIUM",
        },
        {
            name: "Jessica",
            role: "Video SEO Expert and Digital Marketing Strategist with Proven Expertise in Video Content Creation, Audience Engagement, and ROI-Driven Campaigns for E-commerce Businesses",
            rating: 4.0,
            reviews: 2,
            projects: 2,
            rate: 32.0,
            skills: ["E-commerce", "Shopify", "UX/UI"],
            image: "https://demo.yo-gigs.com/image/show/4/8/MEDIUM",
        },
        {
            name: "Mamie",
            role: "Shopify Designer and E-commerce Solutions Architect with a Strong Focus on Custom App Integrations, Payment Gateway Setup, and Mobile-First Design Strategies",
            rating: 4.0,
            reviews: 1,
            projects: 1,
            rate: 37.0,
            skills: ["E-commerce", "Shopify", "UX/UI"],
            image: "https://demo.yo-gigs.com/image/show/4/42/MEDIUM",
        },
        {
            name: "Alison",
            role: "WordPress Developer and Custom Plugin Specialist with Extensive Knowledge of WooCommerce, Multisite Configurations, and Advanced Custom Fields for Dynamic Websites",
            rating: 3.0,
            reviews: 2,
            projects: 2,
            rate: 35.0,
            skills: ["E-commerce", "Shopify", "UX/UI"],
            image: "https://demo.yo-gigs.com/image/show/4/1/MEDIUM",
        },
        {
            name: "Cameron",
            role: "Cloud Security Engineer and Infrastructure Consultant with Expertise in DevSecOps, Threat Modeling, and Secure Cloud Architecture for Enterprise-Level Applications",
            rating: 3.5,
            reviews: 2,
            projects: 2,
            rate: 34.0,
            skills: ["E-commerce", "Shopify", "UX/UI"],
            image: "https://demo.yo-gigs.com/image/show/4/19/MEDIUM",
        }
    ],
    addFreelancer: (freelancer) => set((state) => ({ freelancers: [...state.freelancers, freelancer] })),
    removeFreelancer: (id) => set((state) => ({ freelancers: state.freelancers.filter((f) => f.id !== id) })),
}));

export const useServiceStore = create<ServiceState>((set) => ({
    services: [],
    addService: (service) => set((state) => ({ services: [...state.services, service] })),
    removeService: (id) => set((state) => ({ services: state.services.filter((s) => s.id !== id) })),
}));

export const useJobPostStore = create<JobPostState>((set) => ({
    jobPosts: [],
    addJobPost: (jobPost) => set((state) => ({ jobPosts: [...state.jobPosts, jobPost] })),
    removeJobPost: (id) => set((state) => ({ jobPosts: state.jobPosts.filter((j) => j.id !== id) })),
}));