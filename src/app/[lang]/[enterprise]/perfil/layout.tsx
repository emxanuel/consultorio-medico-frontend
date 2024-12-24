import { ProfileHeader } from "@/components/features/profile/header"
import { SettingsSidebar } from "@/components/features/profile/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background">
                <SettingsSidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <ProfileHeader />
                    <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}