import { getAccount } from "@/features/general/actions/getAccount"
import { getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"
import { homeImage } from "@/assets"
import Image from "next/image"
import Link from "next/link"

export default async function Page({params}: {params: {enterprise: string}}) {
    const data = await getAccount(params.enterprise)
    const session = await getSession()
    const user = session?.user

    if (user?.nickname === 'admin' && data.admin.email !== 'admin@admin.com'){
        redirect('/')
    }

    if (data && user?.email !== data.admin.email){
        redirect('/')
    }

    return (
        <div>
            <div className="relative">
                <Image className="w-full h-[100vh] md:h-full object-[-29rem] object-cover md:object-[0px]" src={homeImage.src} alt="home" width={1280} height={719} />
                <div className="absolute w-full h-full bg-black z-10 top-0 opacity-50 md:opacity-35" />
                <div className="absolute w-full h-full z-20 top-0 flex items-center justify-center flex-col">
                    <h1 className="text-white text-2xl md:text-4xl font-bold">Bienvenido a</h1>

                    <h2 className="text-blue-200 text-4xl text-center md:text-left md:text-6xl font-bold">{data.name}</h2>

                    <p className="text-white text-2xl font-bold">Tu salud es lo más importante</p>

                    <Link href={`/${params.enterprise}/registro`} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Agendar consulta</Link>
                </div>
            </div>
        </div>
    )
}