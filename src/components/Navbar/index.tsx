import { Navbar as Nav, NavbarBrand, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/assets";

export default function Navbar() {

    return (
        <Nav className="w-screen">
            <NavbarBrand>
                <Link href="/">
                    <Image src={logo.src} alt="Logo" width={200} height={100} />
                </Link>
            </NavbarBrand>
            <NavbarItem>
                <Link href="/">Registro</Link>
            </NavbarItem>
            <NavbarItem>
                <Link href="/consultas">Consultas</Link>
            </NavbarItem>
        </Nav>
    )
}