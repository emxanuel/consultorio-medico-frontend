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
    <main>
      <h1>{dictionary.title}</h1>
      <AccountList token={token || ''}/>
    </main>
  )
}