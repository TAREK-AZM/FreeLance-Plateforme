// import { Bell, User, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { NotificationDropdown } from "./NotificationDropdown";
// import { Link } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { useState } from "react";
//
// function Header({ name, email, activeTab, setActiveTab }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//
//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);
//
//   return (
//       <>
//         <header className="border-b bg-gradient-to-r from-stone-800/80 to-cyan-950/80 backdrop-blur-md shadow-2xl">
//           <div className="container mx-auto px-8 py-8">
//             <div className="flex items-center justify-between">
//               {/* Left Section: Sidebar Toggle and Title */}
//               <div className="flex items-center gap-4">
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={toggleSidebar}
//                     className="text-stone-200"
//                 >
//                   <Menu className="h-6 w-6" />
//                 </Button>
//                 <h1 className="text-xl font-bold text-stone-100">FreeLance</h1>
//               </div>
//
//               {/* Right Section: Notifications and Profile */}
//               <div
//                   className={`flex items-center gap-4 ${
//                       isSidebarOpen ? "hidden" : "flex"
//                   }`}
//               >
//                 <NotificationDropdown />
//                 <div className="flex items-center gap-3">
//                   <Link to="/profile">
//                     <div className="text-right">
//                       <h2 className="text-sm font-semibold text-stone-100">
//                         {name}
//                       </h2>
//                       <p className="text-xs font-medium text-stone-300">
//                         {email}
//                       </p>
//                     </div>
//                   </Link>
//                   <Link to="/profile">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src="/placeholder.svg" />
//                       <AvatarFallback>
//                         <User />
//                       </AvatarFallback>
//                     </Avatar>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
//
//         {/* Sidebar */}
//         <Sidebar
//             isOpen={isSidebarOpen}
//             onClose={() => setSidebarOpen(false)}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//         />
//       </>
//   );
// }
//
// export default Header;


import { Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationDropdown } from "./NotificationDropdown";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useState } from "react";

function Header({ name, email, activeTab, setActiveTab }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
      <>
        <header className="bg-gradient-to-r from-cyan-950/90 to-gray-900/95 backdrop-blur-lg shadow-lg border-b">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left Section: Sidebar Toggle and Title */}
              <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="text-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold text-gray-100">
                  <span className="text-gray-100">FreeLance</span>

                </h1>
              </div>

              {/* Right Section: Notifications and Profile */}
              <div
                  className={`flex items-center gap-4 ${
                      isSidebarOpen ? "hidden" : "flex"
                  }`}
              >
                <NotificationDropdown />
                <div className="flex items-center gap-3">
                  <Link to="/profile">
                    <div className="text-right">
                      <h2 className="text-sm font-semibold text-gray-100">
                        {name}
                      </h2>
                      <p className="text-xs font-medium text-cyan-200">
                        {email}
                      </p>
                    </div>
                  </Link>
                  <Link to="/profile">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <SideBar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
      </>
  );
}

export default Header;

