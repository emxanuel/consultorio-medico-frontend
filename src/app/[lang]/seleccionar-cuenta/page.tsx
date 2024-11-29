import AccountList from "@/components/features/accounts/account-list";
import { getSession } from "@auth0/nextjs-auth0";

export default async function SelectAccountPage () {
  const session = await getSession()
  const token = session?.accessToken
  return (
    <main>
      <h1>Selecciona tu cuenta</h1>
      <AccountList token={token || ''}/>
    </main>
  )
}