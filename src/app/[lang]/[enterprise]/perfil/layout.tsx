import Sidebar from "@/components/features/profile/sidebar"
import { ReactNode } from "react"

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex w-full justify-center gap-4">
            <Sidebar />
            <section className="w-[50rem]">
                {children}
            </section>
        </main>
    )
}