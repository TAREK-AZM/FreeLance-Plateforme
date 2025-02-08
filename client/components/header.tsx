"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { useAuthStore } from "../store/store"
import { Login } from "./login"
import { Register } from "./register"

export default function Header() {
  const { isAuthenticated } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <a href="/" className="text-2xl font-bold text-green-600">
            Yo!Gigs
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2">Categories</button>
            <a href="/find-freelancer" className="text-sm">Find a freelancer</a>
            <a href="/jobs" className="text-sm">Find jobs</a>
            <a href="/services" className="text-sm">Find service package</a>
            <a href="/about" className="text-sm">About us</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <button className="hidden sm:inline-block text-sm font-medium"
              onClick={() => setShowLogin(true)}>
              Login/Sign-up
            </button>
          )}
          <Button variant="outline" className="hidden sm:inline-flex">
            Become a freelancer
          </Button>
          <Button className="hidden sm:inline-flex bg-green-600 hover:bg-green-700">
            Post a job
          </Button>
          <button className="inline-flex items-center justify-center p-2 rounded-md text-black sm:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            <button className="flex items-center gap-2">Categories</button>
            <a href="/freelancers" className="text-sm">Find a freelancer</a>
            <a href="/jobs" className="text-sm">Find jobs</a>
            <a href="/services" className="text-sm">Find service package</a>
            <a href="/about" className="text-sm">About us</a>
            <hr />
            {!isAuthenticated && (
              <button className="text-sm font-medium"
                onClick={() => setShowLogin(true)}>
                Login/Sign-up
              </button>
            )}
            <Button variant="outline" className="w-full justify-center">
              Become a freelancer
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Post a job
            </Button>
          </nav>
        </div>
      )}

      {showLogin && <Login onClose={() => setShowLogin(false)} openRegister={() => {
        setShowLogin(false); setShowRegister(true)
      }} />}
      
      {showRegister && <Register onClose={() => setShowRegister(false)} openLogin={() => {
        setShowRegister(false); setShowLogin(true)
      }} />}
    </header>
  )
}
