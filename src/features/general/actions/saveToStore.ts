import { userStore, Account } from "../store/userStore";

export const saveToStore = async (accounts: Account[], email: string, actualAccount: Account) => {
    const { setUser } = userStore()
    console.log(accounts)
    setUser({
        email,
        accounts,
        actualAccount
    })
}