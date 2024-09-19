'use client'
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useState, MouseEvent } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (user.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
            router.push('/home')
        } else {
            alert('Usuario o contraseña incorrectos')
        }
    }

    return (
        <form className="w-[90%] max-w-[40rem] flex flex-col items-center gap-4">
            <Input className="max-w-80" fullWidth onChange={e => setUser(e.target.value)} placeholder="Usuario" />
            <Input className="max-w-80" fullWidth onChange={e => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
            <Button className="max-w-80" fullWidth color="primary" variant="bordered" onClick={handleClick}>Entrar</Button>
        </form>
    )
}