'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
        <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="submit">Guardar cambios</Button>
            </div>
        </form>
    )
}