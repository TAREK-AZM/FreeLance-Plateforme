
import { useState } from "react"
import { Menu, X, MessageSquare, Bell, Plus, LogOut, Wallet, User, LayoutDashboard } from "lucide-react"
import { Button } from "../ui/button"
import { useAuthStore } from "../../store/store"
import { Login } from "./login"
import { Register } from "./register"
import { Link } from "react-router-dom";
import { MessagesPopover } from "./Messages-Proper" // ✅ Import the Messages component
import { PostJobForm } from "./PostJobForm"

export default function Header() {
  const [showPostJobForm, setShowPostJobForm] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  // const [isClientMode, setIsClientMode] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // information about the user authenticated
  const { user } = useAuthStore();

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setShowUserMenu(false)
  }

  const userMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Wallet, label: "My wallet", href: "/wallet" },
    { icon: User, label: "My account", href: "/account" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">

            <span className="text-xl font-bold text-[#12AE65]">FreeLance</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">Categories</button>
            <Link to="/client/freelancers" className="text-gray-700 hover:text-gray-900">
              Find a freelancer
            </Link>
            <Link to="/client/jobs" className="text-gray-700 hover:text-gray-900">
              Find jobs
            </Link>
            <Link to="/client/services" className="text-gray-700 hover:text-gray-900">
              Find service package
            </Link>

          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button className="relative p-2 text-gray-700 hover:text-gray-900">
                <MessagesPopover />
              </button>
              <button className="relative p-2 text-gray-700 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
                  54
                </span>
              </button>
              <div className="relative hidden sm:block">
                <button
                  className="flex items-center gap-2 hover:opacity-80"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <img src={user.image} alt="User Avatar" fill className="object-cover" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {/* Desktop User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4 text-center">
                      <div className="mx-auto mb-2 h-20 w-20 overflow-hidden rounded-full">
                        <img
                          src={user.image}
                          alt="User Avatar"
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                    </div>
                    <div className="border-t">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      ))}
                      {/* <div className="flex items-center justify-between border-t px-4 py-2">
                        <span className="text-sm text-gray-700">Log in as a client</span>
                        <Switch checked={isClientMode} onCheckedChange={setIsClientMode} />
                      </div> */}
                      <button
                        className="flex w-full items-center gap-3 border-t px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        onClick={() => {
                          /* handle logout */
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                Login/Sign-up
              </Link>
              <Button
                variant="outline"
                className="hidden sm:inline-flex bg-[#E7F7EF] text-[#12AE65] border-[#12AE65] hover:bg-[#d5f0e3]"
              >
                Become a freelancer
              </Button>
            </>
          )}
          <Button onClick={() => setShowPostJobForm(true)} className="hidden sm:inline-flex bg-[#12AE65] hover:bg-[#0d8d52]">
            <Plus className="mr-2 h-4 w-4" /> Post a job
          </Button>
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 sm:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            <button className="flex items-center gap-2 text-gray-700">Categories</button>
            <Link to="client/freelancers" className="text-gray-700">
              Find a freelancer
            </Link>
            <Link to="/client/jobs" className="text-gray-700">
              Find jobs
            </Link>
            <Link to="/client/services" className="text-gray-700">
              Find service package
            </Link>

            <hr className="my-2" />
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-4 py-2">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <img src="/placeholder.svg" alt="User Avatar" fill className="object-cover" />
                  </div>
                  <span className="text-lg font-medium">Alex</span>
                </div>
                {userMenuItems.map((item) => (
                  <Link key={item.label} to={item.href} className="flex items-center gap-3 py-2 text-gray-700">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                {/* <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Log in as a client</span>
                  <Switch checked={isClientMode} onCheckedChange={setIsClientMode} />
                </div> */}
                <button
                  className="flex items-center gap-3 py-2 text-red-600"
                  onClick={() => {
                    /* handle logout */
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </>
            ) : (


              <Link to={"/login"}>
                Login/Sign-up
              </Link>


            )}

            <Button
              variant="outline"
              className="w-full justify-center bg-[#E7F7EF] text-[#12AE65] border-[#12AE65] hover:bg-[#d5f0e3]"
            >
              Become a freelancer
            </Button>
            <Button className="w-full justify-center bg-[#12AE65] hover:bg-[#0d8d52]">
              <Plus className="mr-2 h-4 w-4" /> Post a job
            </Button>
          </nav>
        </div>
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          openRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          openLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}


      {showPostJobForm && <PostJobForm onClose={() => setShowPostJobForm(false)} />}

    </header>
  )
}

