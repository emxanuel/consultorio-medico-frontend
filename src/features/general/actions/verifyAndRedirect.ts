import { getSession } from "@auth0/nextjs-auth0"
import { redirect, RedirectType } from "next/navigation"
import { getAccounts } from "@/features/general/actions/getAccounts"
import { verifyUser } from "@/features/general/actions/verifyUser"

export const verifyAndRedirect = async (accountKey?: string, isOnFinishRegister?: boolean) => {
    if (accountKey) {
        const session = await getSession()
        if (!session || !session.user) {
            redirect('/api/auth/login')
        }
        const user = session.user
        const verified = await verifyUser(user?.email)
    
        if (!verified) {
            redirect('/')
        }
        return
    }
    
    const session = await getSession()
    if (!session || !session.user) {
        redirect('/api/auth/login')
    }
    
    const user = session.user
    const [verified, accounts] = await Promise.all([
        verifyUser(user?.email),
        getAccounts(user?.email)
    ])

    console.log(verified, accounts, isOnFinishRegister)

    if (!verified){
        if (!isOnFinishRegister) {
            redirect('/finalizar-registro', RedirectType.push)
        }
        else{
            return
        }
    }
    
    if (verified) {
        if (accounts.length > 1) {
            redirect('/seleccionar-cuenta')
        }
        if (accounts.length === 1) {
            redirect(`/${accounts[0].account_key}`)
        }
    }
}