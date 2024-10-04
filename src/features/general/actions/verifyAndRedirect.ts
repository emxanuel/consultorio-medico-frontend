import { getSession } from "@auth0/nextjs-auth0"
import { redirect, RedirectType } from "next/navigation"
import { getAccounts } from "@/features/general/actions/getAccounts"
import { verifyUser } from "@/features/general/actions/verifyUser"

export const verifyAndRedirect = async (accountKey?: string, isOnFinishRegister?: boolean, isOnHome?: boolean) => {
    if (accountKey) {
        const session = await getSession()
        if (!session || !session.user) {
            redirect('/')
        }
        const user = session.user
        const verified = await verifyUser(user.nickname === 'admin'? 'admin@admin.com': user?.email)
    
        if (!verified) {
            redirect('/')
        }
        return
    }
    
    const session = await getSession()
    
    if (!isOnHome){
        if (!session || !session.user) {
            redirect('/')
        }
    }
    else{
        if (!session || !session.user) {
            return
        }
    }

    
    const user = session.user
    const [verified, accounts] = await Promise.all([
        verifyUser(user.nickname === 'admin'? 'admin@admin.com': user?.email),
        getAccounts(user.nickname === 'admin'? 'admin@admin.com': user?.email)
    ])

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