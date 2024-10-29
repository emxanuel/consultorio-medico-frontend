import { getDictionary, Locale } from "@/dictionaries/getDictionary"
import { verifyAndRedirect } from "@/actions/common/verify-and-redirect"
import RegistrationForm from "@/components/features/auth/registration-form"

interface IParams {
    lang: string
}

export default async function Page({ params }: { params: IParams }) {
    console.log('isOnFinishRegister', true)
    await verifyAndRedirect(undefined, true)
    const dictionary = await getDictionary(params.lang as Locale)
    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-screen">
            <h1 className="text-4xl font-bold mb-4">{dictionary.sign_up.finish_register.title}</h1>
            <h2 className="text-2xl mb-2">{dictionary.sign_up.finish_register.subtitle}</h2>

            <RegistrationForm />
        </main>
    )
}