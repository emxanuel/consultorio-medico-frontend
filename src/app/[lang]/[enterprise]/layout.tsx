import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";


export default async function EnterpriseLayout({ children }: { children: ReactNode }) {
    const { accessToken } = await getAccessToken()
    return (
        <main className="flex flex-col w-full">
            <Navbar accessToken={accessToken as string}/>
            {children}
            <Footer />
        </main>
    );
}