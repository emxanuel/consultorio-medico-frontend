import { homeImage } from "@/assets"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
    title: "Inicio"
}

export default function Home() {
    return (
        <div>
            <div className="relative">
                <Image className="w-full" src={homeImage.src} alt="home" width={1280} height={719} />
                <div className="absolute w-full h-full bg-black z-10 top-0 opacity-35" />
                <div className="absolute w-full h-full z-20 top-0 flex items-center justify-center flex-col">
                    <h1 className="text-white text-4xl font-bold">Bienvenido a</h1>

                    <h2 className="text-blue-200 text-6xl font-bold">Clínica Dr. Abel González</h2>

                    <p className="text-white text-2xl font-bold">Tu salud es lo más importante</p>

                    <Link href='/registro' className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Agendar consulta</Link>
                </div>
            </div>
        </div>
    )
}