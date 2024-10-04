'use client'

import { Navbar as Nav, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/assets";
import { useEffect, useReducer } from "react";
import { userStore } from "../../store/userStore";
import { useGetAccounts } from "../../hooks/useGetAccounts";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGetAccount } from "../../hooks/useGetAccount";
import { useParams } from "next/navigation";



export default function Navbar() {
    const params = useParams()
    const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false)
    const { setUser, user: storeUser } = userStore()
    const session = useUser()
    const user = session.user
    const { accountsQuery } = useGetAccounts(user?.nickname === 'admin' ? 'admin@admin.com' : user?.email as string)
    const { accountQuery } = useGetAccount(params.enterprise as string)
    const accounts = accountsQuery.data
    const actualAccount = accountQuery.data

    useEffect(() => {
        if (accounts && accounts.length === 1) {
            setUser({
                email: user?.nickname === 'admin' ? 'admin@admin.com' : user?.email as string,
                accounts,
                actualAccount
            })
        }
    }, [accounts, accountsQuery.isLoading, actualAccount, setUser, user?.email, user?.nickname])

    const links = [
        {
            name: "Registro",
            url: `/${storeUser.actualAccount?.account_key}/registro`
        },
        {
            name: "Consultas",
            url: `/${storeUser.actualAccount?.account_key}/consultas`
        }
    ]



    return (
        <Nav className="w-screen bg-white bg-opacity-60" isMenuOpen={isMenuOpen} onMenuOpenChange={() => setIsMenuOpen()}>
            <NavbarBrand>
                <Link href={user ? '/' : ''}>
                    {actualAccount && actualAccount.admin.email === 'admin@admin.com' && <Image src={logo.src} alt="Logo" width={200} height={100} />}

                    {actualAccount && actualAccount.admin.email !== 'admin@admin.com' && <h1>{storeUser.actualAccount?.name}</h1>}
                </Link>
            </NavbarBrand>
            {user && <>
                <>
                    {links.map((link, index) => (
                        <NavbarItem key={index} className="hidden md:block">
                            <Link href={user ? link.url : ''}>{link.name}</Link>
                        </NavbarItem>
                    ))}
                    <NavbarItem className="hidden md:block">
                        <button onClick={() => window.location.href = '/api/auth/logout'}>Logout</button>
                    </NavbarItem>
                </>
                <>
                    <NavbarMenuToggle className="md:hidden" />
                    <NavbarMenu style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }}>
                        {
                            links.map((link, index) => (
                                <NavbarMenuItem key={index}>
                                    <Link onClick={() => setIsMenuOpen()} href={user ? link.url : ''}>{link.name}</Link>
                                </NavbarMenuItem>
                            ))
                        }
                        <NavbarMenuItem>
                            <button onClick={() => window.location.href = '/api/auth/logout'}>Logout</button>
                        </NavbarMenuItem>
                    </NavbarMenu>
                </>
            </>}
        </Nav>
    )
}