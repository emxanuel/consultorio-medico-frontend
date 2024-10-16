'use client'

import { useUser } from "@auth0/nextjs-auth0/client"
import { Input } from "@nextui-org/react"
import { ChangeEvent, useEffect, useState } from "react"

export default function UpdateForm() {

    const session = useUser()
    const user = session?.user

    const [form, setForm] = useState({
        firstName: user?.given_name as string || '',
        lastName: user?.family_name as string || ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setForm({
            firstName: user?.given_name as string || '',
            lastName: user?.family_name as string || ''
        })
    }, [user])

    return (
        <form action="">
            <Input onChange={handleChange} value={form.firstName} name="firstName" label='Nombre' />
            <Input onChange={handleChange} value={form.lastName} name="lastName" label='Apellido' />
        </form>
    )
}