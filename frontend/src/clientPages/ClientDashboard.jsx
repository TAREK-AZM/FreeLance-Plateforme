import { Outlet } from "react-router-dom"
import { SidebarProvider } from "../components/ui/sidebar"
import  Header  from "../components/clientComponents/header-Dashboard"
import FillterJobsHeader from "../components/clientComponents/offres-client"
import { AppSidebar } from "../components/clientComponents/sidebar-Dashboard"
import { MobileNav } from "../components/clientComponents/mobile-nav"

export default function RootLayout() {


    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <SidebarProvider className="">
                    <div className="flex w-full min-h-screen ">
                        <AppSidebar />
                        <div className="flex w-full flex-col ">
                            <Header />
                            <main className="flex-1 w-full">
                                <Outlet />
                            </main>
                        </div>
                    </div>
                    <MobileNav />
                </SidebarProvider>
            </body>
        </html>
    )
}

