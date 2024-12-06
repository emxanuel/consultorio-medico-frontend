'use client'

import { userStore } from "@/store/user-store"
import { useGetAccounts } from "@/hooks/features/accounts/useGetAccounts"
import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useDictionary } from "@/dictionaries/dictionary-provider"
import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Building2, CheckCircle2 } from "lucide-react"
import { Chip } from "@nextui-org/react"

interface IProps {
  token: string
}

export default function AccountList({ token }: IProps) {
  const { user } = useUser()
  const { accountsQuery } = useGetAccounts(user?.email || '', token)
  const dictionary = useDictionary().account_selection
  return (
    accountsQuery.isLoading || !Array.isArray(accountsQuery?.data) ? (
      <></>
    ) : (
      <div className="flex flex-col gap-4 w-full">
        {accountsQuery.data?.map((account) => (
          <Link href={`/${account.account_key}`} key={account.account_key}>
            <Card className="hover:scale-[1.02] transition-transform cursor-pointer">
              <CardBody className="flex flex-row items-center gap-4 p-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{account.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Chip
                      size="sm"
                      startContent={<CheckCircle2 className="w-3 h-3" />}
                    >
                      {account.active ? dictionary.active : dictionary.inactive}
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

    )
  )
}