'use client'

import Link from "next/link"
import { useParams } from "next/navigation"

export default function Sidebar(){
    const params = useParams()
    return (
        <nav className="p-5 min-h-[28.45rem] border-r border-r-gray-800">
            <ul>
                <li>
                    <Link href={`/${params.lang}/${params.enterprise}/perfil`}>
                        Perfil
                    </Link>
                </li>
                <li>
                    <Link href={`/${params.lang}/${params.enterprise}/perfil/licenciamiento`}>
                        Licenciamiento
                    </Link>
                </li>
                <li>
                    <Link href={`/${params.lang}/${params.enterprise}/perfil/configuracion`}>
                        Configuración
                    </Link>
                </li>
                <li>
                    <Link href={`/${params.lang}/${params.enterprise}/perfil/seguridad`}>
                        Seguridad
                    </Link>
                </li>
            </ul>
        </nav>
    )
}