// import PaypalButton from "@/features/general/components/PaypalButton"
import Login from "@/features/login/componets/Login"
import { getSession } from "@auth0/nextjs-auth0"

export default async function LoginPage() {
    const user = await getSession()
    console.log(user)
    return (
        <main className="flex flex-col gap-10 justify-center items-center pt-40">
            <h1 className="text-2xl">Iniciar sesión</h1>
            <Login />
            {/* <PaypalButton /> */}
        </main>
    )
}