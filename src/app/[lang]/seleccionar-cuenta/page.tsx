import AccountList from "@/components/features/accounts/account-list";
import { getDictionary, Locale } from "@/dictionaries/getDictionary";
import { getSession } from "@auth0/nextjs-auth0";

interface IParams {
  lang: string
}


export default async function SelectAccountPage ({ params }: {params: IParams}) {
  const session = await getSession()
  const token = session?.accessToken
  const dictionary = getDictionary(params.lang as Locale).account_selection
  return (
    <main className="max-w-3xl w-screen mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">{dictionary.title}</h1>
      <AccountList token={token || ''}/>
    </main>
  )
}