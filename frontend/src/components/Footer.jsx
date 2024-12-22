import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"

function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-stone-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Job Board</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Client Requests</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Profile</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>support@freelance.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-stone-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-stone-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-stone-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-stone-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Terms and Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-700 text-center">
          <p>© 2024 FreeLance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;