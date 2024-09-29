'use client'

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useVerifyUser } from "../../hooks/useVerifyUser"

export default function RegistrationForm() {
    const [accountName, setAccountName] = useState('')
    const userData = useUser()
    const { verifyUserQuery } = useVerifyUser(userData.isLoading ? '' : userData.user?.email ?? '')
    console.log(verifyUserQuery.data)


    if (userData.isLoading) return <p>Cargando...</p>
    if (verifyUserQuery.data === true) return <p>Ya tienes una cuenta</p>

    return (
        <form className="w-[90%] max-w-[40rem] flex flex-col items-center gap-4">
            <Input
                label="Nombre de la organización"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
            />
            <Button className="max-w-80" fullWidth color="primary" variant="bordered">Crear cuenta</Button>
        </form>
    )
}