import { userStore, Account } from "../store/userStore";

export const saveToStore = async (accounts: Account[], email: string, actualAccount: Account) => {
    const { setUser } = userStore()
    setUser({
        email,
        accounts,
        actualAccount
    })
}