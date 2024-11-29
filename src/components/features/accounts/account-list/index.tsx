'use client'

import { userStore } from "@/store/user-store"
import { useGetAccounts } from "@/hooks/features/accounts/useGetAccounts"
import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"

interface IProps {
  token: string
}

export default function AccountList ({ token }: IProps) { 
  const { user } = useUser()
  const { accountsQuery } = useGetAccounts(user?.email || '', token)
  return (
    accountsQuery.isLoading || !Array.isArray(accountsQuery?.data) ? (
      <></>
    ) : (
      <div>
        {accountsQuery.data?.map((account) => (
          <Link href={`/${account.account_key}`} key={account.account_key}>
            <h2>{account.name}</h2>
            <p>{account.account_key}</p>
          </Link>
        ))}
      </div>
    )
  )
}