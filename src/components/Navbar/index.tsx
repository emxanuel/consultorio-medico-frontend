import { Navbar as Nav, NavbarItem } from "@nextui-org/react";
import Link from "next/link";

export default function Navbar() {

    return (
        <Nav className="w-screen">
            <NavbarItem>
                <Link href="/">Registro</Link>
            </NavbarItem>
            <NavbarItem>
                <Link href="/consultas">Consultas</Link>
            </NavbarItem>
        </Nav>
    )
}