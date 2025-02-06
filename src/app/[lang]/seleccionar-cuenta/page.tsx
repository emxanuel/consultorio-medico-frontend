import AccountList from "@/components/features/accounts/account-list";
import { getDictionary, Locale } from "@/dictionaries/getDictionary";
import { getSession } from "@auth0/nextjs-auth0";

interface IParams {
  lang: string
}


export default async function SelectAccountPage({ params }: { params: IParams }) {
  const session = await getSession()
  const token = session?.accessToken
  const dictionary = getDictionary(params.lang as Locale).account_selection
  return (
    <main className="w-screen h-screen p-4">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-6">{dictionary.title}</h1>
        <AccountList token={token || ''} />
      </div>
    </main>
  )
}