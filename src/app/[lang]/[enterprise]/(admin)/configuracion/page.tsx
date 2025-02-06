import { me } from "@/actions/features/auth/me"
import UpdateForm from "@/components/features/profile/update-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getSession } from "@auth0/nextjs-auth0"
import Image from "next/image"

export default async function Page() {
    const session = await getSession()
    const auth0User = session?.user
    const user = await me(session?.user.email, session?.accessToken as string)

    return (
        <Card className="w-full max-w-2xl mx-auto border-none shadow-none">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={auth0User?.picture} alt="Profile picture" width={80} height={80} />
                        <AvatarFallback className="text-2xl">
                            {user?.first_name?.[0]}
                            {user?.last_name?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold">
                            {user?.first_name} {user?.last_name}
                        </h1>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <UpdateForm />
            </CardContent>
        </Card>
    )
}