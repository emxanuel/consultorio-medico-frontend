import { verifyAndRedirect } from "@/actions/common/verify-and-redirect"
import { homeImage } from "@/assets"
import { getDictionary, Locale } from "@/dictionaries/getDictionary"
import { Button } from "@nextui-org/react"
import { Heart, Stethoscope } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


interface IParams {
    lang: string
}

export default async function Page({ params }: { params: IParams }) {
    await verifyAndRedirect(undefined, false, true)
    const lang = params.lang
    const dictionary = getDictionary(lang as Locale)

    return (
        <main className="h-screen overflow-hidden relative w-screen bg-black to-white flex flex-col items-center justify-center">
            <Image className="w-full h-[100vh] md:h-full object-[-29rem] object-cover md:object-[0px] opacity-20" src={homeImage.src} alt="home" width={1280} height={719} />
            <div className="w-full max-w-md absolute">
                <div className="mb-8 flex justify-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                        <span className="text-2xl font-bold">LOGO</span>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                        Medical System
                    </h1>

                    <p className="text-center text-gray-600 mb-8">
                        {dictionary.sign_up.welcome}
                    </p>

                    <Link href="/api/auth/login" passHref>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                            {dictionary.sign_up.welcome_button_label}
                        </Button>
                    </Link>

                    <div className="mt-8 flex justify-center space-x-4 text-blue-400">
                        <Heart size={24} />
                        <Stethoscope size={24} />
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500">
                    &copy; 2024 Medical System. All rights reserved.
                </p>
            </div>
        </main>
    )
}