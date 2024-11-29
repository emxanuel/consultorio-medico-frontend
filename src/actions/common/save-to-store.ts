import { userStore, Account } from "@/store/user-store";

export const saveToStore = async (accounts: Account[], email: string, actualAccount: Account, token: string) => {
    const { setUser } = userStore()
    setUser({
        email,
        accounts,
        actualAccount,
        token
    })
}