import { me } from "@/actions/features/auth/me"
import UpdateForm from "@/components/features/profile/update-form"
import { getSession } from "@auth0/nextjs-auth0"
import Image from "next/image"

export default async function Page(){
    const session = await getSession()
    const auth0User = session?.user
    const user = await me(session?.user.email, session?.accessToken as string)

    return (
        <div>
            <h1>{user?.first_name} {user?.last_name}</h1>
            <h2>{user?.email}</h2>
            <Image width={100} height={100} src={auth0User?.picture} alt="profile image"/>
            <UpdateForm />
        </div>
    )
}