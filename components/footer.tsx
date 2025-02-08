import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold mb-4">For Talents</h3>
            <ul className="space-y-2">
              <li>
                <a href="/find-work" className="text-gray-600 hover:text-gray-900">
                  Find Work
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="/knowledge" className="text-gray-600 hover:text-gray-900">
                  Knowledge Centre
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <a href="/find-talent" className="text-gray-600 hover:text-gray-900">
                  Find a Talent
                </a>
              </li>
              <li>
                <a href="/browse-jobs" className="text-gray-600 hover:text-gray-900">
                  Browse Jobs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Get in touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-600">ITC 3, Sector 67, Sahibzada Ajit Singh Nagar, Punjab 160062</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:yogigs@dummyid.com" className="text-gray-600">
                  yogigs@dummyid.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+916284314570" className="text-gray-600">
                  +91 6284314570
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">Copyright © 2025 YoGigs developed by FATbit Technologies.</p>

          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

