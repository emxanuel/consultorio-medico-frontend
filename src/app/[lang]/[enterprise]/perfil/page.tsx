import UpdateForm from "@/components/features/profile/update-form"
import { getSession } from "@auth0/nextjs-auth0"
import Image from "next/image"

export default async function Page(){
    const session = await getSession()
    const user = session?.user

    return (
        <div>
            <h1>{user?.name}</h1>
            <h2>{user?.email}</h2>
            <Image width={100} height={100} src={user?.picture} alt="profile image"/>
            <UpdateForm />
        </div>
    )
}