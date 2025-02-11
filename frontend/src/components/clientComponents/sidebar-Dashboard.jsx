import { useState } from "react";
import { useLocation } from "react-router-dom";
import {LayoutDashboard,Settings, ShoppingCart, MessageSquare, Tags, Gift, Users, FileQuestion, Wallet, History, Globe,Plus} from "lucide-react";
import cn from "classnames";
import { Sidebar, SidebarContent,SidebarHeader,SidebarMenu,SidebarMenuItem,SidebarMenuButton,} from "../ui/sidebar";
import { Button } from "../ui/button";
import { PostJobForm } from "./PostJobForm"



const navigation = [
    {
        title: "PROFILE",
        items: [
            { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
            { title: "Account settings", icon: Settings, href: "/settings" },
        ],
    },
    {
        title: "BOOKING",
        items: [{ title: "Jobs", icon: ShoppingCart, href: "/jobs" }],
    },
    {
        title: "HISTORY",
        items: [
            { title: "Job orders", icon: History, href: "/orders" },
            { title: "Wallet recharge orders", icon: Wallet, href: "/wallet" },
        ],
    },
    {
        title: "READY TO SERVICE",
        items: [
            { title: "Ready To Service", icon: Users, href: "/service" },
            { title: "Market Place Service", icon: Globe, href: "/marketplace" },
        ],
    },
    {
        title: "DISCUSSION FORUM",
        items: [
            { title: "My questions", icon: FileQuestion, href: "/questions" },
            { title: "Subscribed tags", icon: Tags, href: "/tags" },
        ],
    },
    {
        title: "OTHERS",
        items: [
            { title: "Messages", icon: MessageSquare, href: "/messages" },
        ],
    },
];

export function AppSidebar() {
    const [showPostJobForm, setShowPostJobForm] = useState(false)


    const location = useLocation(); // ✅ Get the current path
    const pathname = location.pathname;

    return (
        <Sidebar className="hidden border-r lg:block">
            <SidebarHeader className="border-b p-4">
                <div className="flex items-center gap-2">
                    <Button onClick={() => setShowPostJobForm(true)} className="hidden sm:inline-flex bg-[#12AE65] hover:bg-[#0d8d52]">
                        <Plus className="mr-2 h-4 w-4" /> Post a job
                    </Button>

                </div>
            </SidebarHeader>
            <SidebarContent className="p-4">
                {navigation.map((group, i) => (
                    <div key={group.title} className={cn("space-y-4", i !== 0 && "mt-6")}>
                        <h4 className="px-2 text-xs  rounded-full hover:bg-[#ddf3e9]  font-semibold tracking-wider text-muted-foreground">
                            {group.title}
                        </h4>
                        <SidebarMenu >
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.href}  >
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        className={cn(
                                            "w-full rounded-full hover:bg-[#ddf3e9]",
                                            pathname === item.href && "bg-primary/10 text-primary"
                                        )}
                                    >
                                        <a href={item.href}>
                                            <item.icon className="mr-2 h-4 w-4 text-[#12AE65]" />
                                            {item.title}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </div>
                ))}
            </SidebarContent>
            {showPostJobForm && <PostJobForm onClose={() => setShowPostJobForm(false)} />}

        </Sidebar>

    );
}
