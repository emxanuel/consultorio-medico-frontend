import { verifyAndRedirect } from "@/features/general/actions/verifyAndRedirect"
import RegistrationForm from "@/features/login/componets/RegistrationForm"

export default async function Page(){
    await verifyAndRedirect()
    return (
        <main>
            <RegistrationForm />
        </main>
    )
}