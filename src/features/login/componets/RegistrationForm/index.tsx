'use client'

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useState, MouseEvent } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useMutation } from "@tanstack/react-query"
import { createUser } from "../../actions/createUser"

export default function RegistrationForm() {
    const [accountName, setAccountName] = useState('')
    const userData = useUser()
    const user = userData.user
    const signUpMutation = useMutation({
        mutationFn: () => createUser(user?.email as string, user?.given_name as string, user?.family_name as string, accountName),
    })

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        signUpMutation.mutate()
    }

    return (
        <form className="w-[90%] max-w-[40rem] flex flex-col items-center gap-4">
            <Input
                label="Nombre de la organización"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
            />
            <Button className="w-full" disabled={signUpMutation.isPending} onClick={handleClick} color="primary" variant="bordered">Crear cuenta</Button>
        </form>
    )
}