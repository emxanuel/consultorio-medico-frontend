// import PaypalButton from "@/features/general/components/PaypalButton"
import { verifyAndRedirect } from "@/features/general/actions/verifyAndRedirect"
import Login from "@/features/login/componets/Login"

export default async function Page() {
    await verifyAndRedirect(undefined, false, true)

    return (
        <main className="flex flex-col gap-10 justify-center items-center pt-40">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                ¡Bienvenido! Por favor, inicia sesión
            </h1>
            <Login />
            {/* <PaypalButton /> */}
        </main>
    )
}