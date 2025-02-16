
import { useState } from "react"
import { Menu,Bell, MessageSquare,User,LayoutDashboard,Wallet,LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { useAuthStore } from "../../store/store"
import { Link } from "react-router-dom";
import  NotificationsPopover from "./Notifications-Proper"
import { MessagesPopover } from "./Messages-Proper" // ✅ Import the Messages component
export default function HeaderDashboard() {

    const { isAuthenticated } = useAuthStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-14  px-4">
  {/* Sidebar Trigger (Hidden on small screens) */}
  <div className="mr-4 hidden md:flex">
    <SidebarTrigger />
  </div>

  {/* Right Section (User Actions & Navigation) */}
  <div className="flex items-center gap-4 ml-auto">
    {isAuthenticated ? (
      <>
        <button className="relative p-2 text-gray-700 hover:text-gray-900">
          <MessagesPopover />
        </button>
        <button className="relative p-2 text-gray-700 hover:text-gray-900">
          <NotificationsPopover />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative hidden sm:block">
          <button
            className="flex items-center gap-2 hover:opacity-80"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <img src={user.image} alt="User Avatar" className="object-cover w-full h-full" />
            </div>
            <span className="text-sm font-medium">{user.name}</span>
          </button>

          {/* Dropdown Menu */}
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
        <Link to={"/login"}>Login/Sign-up</Link>
        <Button
          variant="outline"
          className="hidden sm:inline-flex bg-[#E7F7EF] text-[#12AE65] border-[#12AE65] hover:bg-[#d5f0e3]"
        >
          Become a freelancer
        </Button>
      </>
    )}

    {/* Mobile Menu Button */}
    <button
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 sm:hidden"
      onClick={toggleMobileMenu}
      aria-label="Toggle navigation"
    >
      {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  </div>
</div>

    </header>
  )
}

