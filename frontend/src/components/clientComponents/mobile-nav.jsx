import { useLocation } from "react-router-dom";
import { Menu, MessageSquare, Bell, Globe, User2 } from "lucide-react";
import cn from "classnames";

const items = [
  {
    title: "Menu",
    icon: Menu,
    href: "/menu",
  },
  {
    title: "Chat",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/notifications",
    badge: 55,
  },
  {
    title: "Browse",
    icon: Globe,
    href: "/browse",
  },
  {
    title: "Profile",
    icon: User2,
    href: "/profile",
    avatar: "/avatars/01.png",
  },
];

export function MobileNav() {
  const location = useLocation(); // ✅ Correct way to get the current path
  const pathname = location.pathname;

  return (
    // <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
    //   <nav className="container flex h-16 items-center justify-between">
    //     {items.map((item) => (
    //       <a
    //         key={item.href}
    //         href={item.href}
    //         className={cn(
    //           "flex flex-col items-center justify-center",
    //           pathname === item.href ? "text-primary" : "text-muted-foreground"
    //         )}
    //       >
    //         <div className="relative">
    //           <item.icon className="h-6 w-6" />
    //           {item.badge && (
    //             <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6934] text-xs font-medium text-white">
    //               {item.badge}
    //             </span>
    //           )}
    //         </div>
    //         <span className="mt-1 text-xs font-medium">{item.title}</span>
    //       </a>
    //     ))}
    //   </nav>
    // </div>
      <></>
  );
}
