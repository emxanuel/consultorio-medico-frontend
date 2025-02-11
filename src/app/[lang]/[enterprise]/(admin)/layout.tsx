import Navbar from "@/components/common/navbar";
import { Sidebar } from "@/components/features/dashboard/sidebar";
import { Locale } from "@/dictionaries/getDictionary";
import { ReactNode } from "react";

interface IProps {
  params: {
    enterprise: string
    lang: string
  }
  children: ReactNode
}

export default function AdminLayout({ children, params }: IProps) {
  return (
    <main className="flex h-screen bg-white w-screen">
      <Sidebar
        accountKey={params.enterprise}
        lang={params.lang as Locale}
      />
      <div className="h-screen overflow-y-auto flex-1 bg-white">
        <Navbar accessToken={params.enterprise} />
        {children}
      </div>
    </main>
  );
}