'use client'

import { Navbar as Nav, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/assets";
import { act, useEffect, useReducer } from "react";
import { userStore } from "../../../store/user-store";
import { useGetAccounts } from "@/hooks/features/accounts/useGetAccounts";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGetAccount } from "@/hooks/features/accounts/useGetAccount";
import { useParams } from "next/navigation";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Languages from "./languages";
import { useDictionary } from "@/dictionaries/dictionary-provider"
import { useSearchParams } from "next/navigation";

export default function Navbar({ accessToken }: { accessToken: string }) {
	const dictionary = useDictionary().navbar
	const params = useParams()
	const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false)
	const { setUser, user: storeUser } = userStore()
	const session = useUser()
	const user = session.user
	const { accountsQuery } = useGetAccounts(user?.email as string, accessToken)
	const { accountQuery } = useGetAccount(params.enterprise as string, accessToken)
	const accounts = accountsQuery.data
	const actualAccount = accountQuery.data

	useEffect(() => {
		if (accounts) {
			setUser({
				email: user?.email as string,
				accounts,
				actualAccount,
				token: accessToken
			})
		}
	}, [accounts, accountsQuery.isLoading, actualAccount, setUser, user?.email, user?.nickname, accessToken])

	const userPicture = user ? <Image width={24} height={24} alt="profile image" src={user?.picture as string} className="w-6 rounded-full" /> : (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5" /><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0" /></svg>
	)

	const links = [
		{
			name: dictionary.register,
			url: storeUser.actualAccount ? `/${storeUser.actualAccount?.account_key}/registro` : ''
		},
		{
			name: dictionary.consultations,
			url: storeUser.actualAccount ? `/${storeUser.actualAccount?.account_key}/consultas` : ''
		},
		{
			name: user ? <Image width={24} height={24} alt="profile image" src={user?.picture as string} className="w-6 rounded-full" /> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5" /><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0" /></svg>,
			url: storeUser.actualAccount ? `/${storeUser.actualAccount.account_key}/perfil` : ''
		}
	]

	const userLinks = [
		{
			name: dictionary.profile,
			url: storeUser.actualAccount ? `/${storeUser.actualAccount.account_key}/perfil` : ''
		},
		{
			name: dictionary.logout,
			url: '/api/auth/logout'
		}
	]



	return (
		<Nav className="w-screen bg-white bg-opacity-60" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarBrand>
				<Link href={storeUser ? `/${storeUser.actualAccount?.account_key}` : ''}>
					{actualAccount && actualAccount.admin.email === 'admin@admin.com' && <Image src={logo.src} alt="Logo" width={200} height={100} />}

					{actualAccount && actualAccount.admin.email !== 'admin@admin.com' && <h1>{storeUser.actualAccount?.name}</h1>}
				</Link>
			</NavbarBrand>
			<>
				{links.slice(0, -1).map((link, index) => (
					<NavbarItem key={index} className="hidden md:block">
						<Link href={user ? link.url : ''}>{link.name}</Link>
					</NavbarItem>
				))}
				<Dropdown>
					<DropdownTrigger>
						<NavbarItem className="hidden md:block">
							{userPicture}
						</NavbarItem>
					</DropdownTrigger>
					<DropdownMenu>
						{userLinks.map((link, index) => (
							<DropdownItem key={index}>
								{link.name === 'Logout' ? <a href={link.url}>{link.name}</a> : <Link prefetch={false} href={user ? link.url : ''}>{link.name}</Link>}
							</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
				<Languages />
			</>
			<>
				<NavbarMenuToggle className="md:hidden" />
				<NavbarMenu style={{
					backgroundColor: 'rgba(255, 255, 255, 0.5)',
				}}>
					{
						links.map((link, index) => (
							<NavbarMenuItem key={index}>
								<Link prefetch={false} onClick={() => setIsMenuOpen()} href={user ? link.url : ''}>{link.name}</Link>
							</NavbarMenuItem>
						))
					}
					{/* <NavbarMenuItem>
                            <button onClick={() => window.location.href = '/api/auth/logout'}>Logout</button>
                        </NavbarMenuItem> */}
				</NavbarMenu>
			</>
		</Nav>
	)
}