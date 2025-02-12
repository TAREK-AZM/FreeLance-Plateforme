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
  freelancers: [],
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

export const useCategoriesStore = create((set) => ({
  Categories: [],
  setCategories: (Categories) => set({ Categories }),
  addCategory: (category) =>
    set((state) => ({ Categories: [...state.Categories, category] })),
  removeCategory: (id) =>
    set((state) => ({
      Categories: state.Categories.filter((c) => c.id !== id),
    })),
}));
 

