'use client'

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useState, MouseEvent, useEffect } from "react"
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { createUser } from "../../actions/createUser"

const useHandleCreation = (signUpMutation: UseMutationResult<unknown, Error, void, unknown>) => {
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setErrorMessage('')

        if (signUpMutation.isSuccess) {
            window.location.href = '/'
        }

        if (signUpMutation.isError) {
            setErrorMessage('Ocurrió un error al crear la cuenta')
        }

    }, [signUpMutation.isSuccess, signUpMutation.isError])

    return { errorMessage }
}

function RegisterUserWithName({ user }: { user: UserProfile }) {
    const [accountName, setAccountName] = useState('')
    const signUpMutation = useMutation({
        mutationFn: () => createUser(user?.email as string, user?.given_name as string, user?.family_name as string, accountName),
    })
    const { errorMessage } = useHandleCreation(signUpMutation)


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
            <p className="text-red-500">{errorMessage}</p>
            <Button className="w-full" disabled={signUpMutation.isPending} onClick={handleClick} color="primary" variant="bordered">Crear cuenta</Button>
        </form>
    )
}

function RegisterUserWithoutName({ user } : { user: UserProfile }) {
    const [accountName, setAccountName] = useState('')
    const [firtsName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const signUpMutation = useMutation({
        mutationFn: () => createUser(user?.email as string, firtsName, lastName, accountName),
    })
    const { errorMessage } = useHandleCreation(signUpMutation)

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
            <Input
                label="Nombre del usuario"
                value={firtsName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
                label="Apellido del usuario"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <p className="text-red-500">{errorMessage}</p>
            <Button className="w-full" disabled={signUpMutation.isPending} onClick={handleClick} color="primary" variant="bordered">Crear cuenta</Button>
        </form>
    )
}

export default function RegistrationForm() {
    const userData = useUser()
    const user = userData.user

    if (!user) return null
    if (!user.given_name) return <RegisterUserWithoutName user={user} />
    return <RegisterUserWithName user={user} />
}