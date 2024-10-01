import { verifyAndRedirect } from "@/features/general/actions/verifyAndRedirect"
import RegistrationForm from "@/features/login/componets/RegistrationForm"

export default async function Page(){
    await verifyAndRedirect(undefined, true)
    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-screen">
            <h1 className="text-4xl font-bold mb-4">Finalizar registro</h1>
            <h2 className="text-2xl mb-2">¡Bienvenido!</h2>
            <h2 className="text-lg mb-6">Llena este formulario para usar este software</h2>

            <RegistrationForm />
        </main>
    )
}