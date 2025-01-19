import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


export default async function EnterpriseLayout({ children }: { children: ReactNode }) {
    let token = ''
    try {
        const { accessToken } = await getAccessToken()
        token = accessToken || ''
    }
    catch (error) {
        redirect('/')
    }

    return (
        <main className="flex flex-col w-full">
            <Navbar accessToken={token as string} />
            {children}
            <Footer />
        </main>
    );
}