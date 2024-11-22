import { verifyAndRedirect } from "@/actions/common/verify-and-redirect"
import PaypalButton from "@/components/common/paypal-button"
import Login from "@/components/features/auth/login-form"
import { getDictionary, Locale } from "@/dictionaries/getDictionary"


interface IParams {
    lang: string
}

export default async function Page({ params }: { params: IParams }) {
    await verifyAndRedirect(undefined, false, true)
    const lang = params.lang
    const dictionary = getDictionary(lang as Locale)

    return (
        <main className="flex flex-col gap-10 justify-center items-center pt-40">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-blue-600">
                {dictionary.sign_up.welcome}
            </h1>
            <Login />
            <PaypalButton />
        </main>
    )
}