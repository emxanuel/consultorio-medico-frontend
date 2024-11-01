import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { ReactNode } from "react";

interface IParams {
    lang: string;
}

export default function EnterpriseLayout({ children, params }: { children: ReactNode, params: IParams }) {
    return (
        <main className="flex flex-col w-full">
            <Navbar language={params.lang}/>
            {children}
            <Footer />
        </main>
    );
}