// import PaypalButton from "@/features/general/components/PaypalButton"
import { verifyAndRedirect } from "@/features/general/actions/verifyAndRedirect"
import Login from "@/features/login/componets/Login"

export default async function Page() {
    await verifyAndRedirect()

    return (
        <main className="flex flex-col gap-10 justify-center items-center pt-40">
            <h1 className="text-2xl">Iniciar sesión</h1>
            <Login />
            {/* <PaypalButton /> */}
        </main>
    )
}