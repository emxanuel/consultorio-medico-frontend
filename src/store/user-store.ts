import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
    email: string;
    accounts: Array<unknown>;
    actualAccount: Account | undefined;
    token: string;
};

export type Account = {
    name: string;
    account_key: string;
    created_at: string;
    admin: {
        email: string;
    };
    active: boolean;
};

interface UserStore {
    user: User;
    setUser: (user: User) => void;
    setAccounts: (accounts: Array<Account>) => void;
    setActualAccount: (actualAccount: Account) => void;
    logout: () => void;
}

export const userStore = create(
    persist<UserStore>(set => ({
        user: {
            email: '',
            accounts: [],
            actualAccount: {
                name: '',
                account_key: '',
                created_at: '',
                admin: {
                    email: ''
                },
                active: false
            },
            token: '',
        },
        setUser: (user: User) => set({ user }),
        setAccounts: (accounts: Array<unknown>) => set((state: { user: User }) => ({ user: { ...state.user, accounts } })),
        setActualAccount: (actualAccount: Account) => set((state: { user: User }) => ({ user: { ...state.user, actualAccount } })),
        logout: () => set({ user: { email: '', accounts: [], token: '', actualAccount: { name: '', account_key: '', created_at: '', active: false, admin: { email: '' } } } })
    }), {
        name: "user-store",
    })
)