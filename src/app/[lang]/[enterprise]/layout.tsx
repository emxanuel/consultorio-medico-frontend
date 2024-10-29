import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { ReactNode } from "react";

export default function EnterpriseLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex flex-col w-full">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}