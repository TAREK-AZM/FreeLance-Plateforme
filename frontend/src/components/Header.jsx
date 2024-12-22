import { Bell, User, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Header({ name, email, onMenuToggle }) {
  return (
    <header className="border-b bg-gradient-to-r from-stone-800 to-cyan-950 shadow-2xl ">
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-stone-100">FreeLance</h1>
            <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden text-stone-200">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-800">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h2 className="text-sm font-semibold text-stone-100">{name}</h2>
                <p className="text-xs font-medium text-stone-300">{email}</p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;
