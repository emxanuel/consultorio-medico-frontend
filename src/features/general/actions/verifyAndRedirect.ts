import { getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"
import { getAccounts } from "@/features/general/actions/getAccounts"
import { verifyUser } from "@/features/general/actions/verifyUser"

export const verifyAndRedirect = async () => {
    const session = await getSession()
    const user = session?.user
    const verified = await verifyUser(user?.email)
    const accounts = await getAccounts(user?.email)
    
    
    if (user && !verified){
        redirect('/finalizar-registro')
    }
    if (user && verified){
        if (accounts.length > 1){
            redirect('/seleccionar-cuenta')
        }
        if (accounts.length === 1){
            redirect(`/${accounts[0].account_key}`)
        }
    }

    return {
        email: user?.email,
        accounts
    }
}