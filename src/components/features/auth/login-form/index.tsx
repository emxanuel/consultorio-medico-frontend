'use client'
import { Button } from "@nextui-org/button"
import { MouseEvent } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter()

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push('/api/auth/login')
    }

    return (
        <form className="w-[90%] max-w-[40rem] flex flex-col items-center gap-4">
            <Button className="max-w-80" fullWidth color="primary" variant="bordered" onClick={handleClick}>Entrar</Button>
        </form>
    )
}