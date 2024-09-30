import Navbar from "@/features/general/components/Navbar";
import { ReactNode } from "react";

export default function EnterpriseLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex flex-col w-full">
            <Navbar />
            {children}
        </main>
    );
}