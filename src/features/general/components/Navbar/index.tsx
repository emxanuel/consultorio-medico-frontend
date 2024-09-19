import { Navbar as Nav, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/assets";

const links = [
    {
        name: "Home",
        url: "/home"
    },
    {
        name: "Registro",
        url: "/registro"
    },
    {
        name: "Consultas",
        url: "/consultas"
    },
]

export default function Navbar() {

    return (
        <Nav className="w-screen bg-white bg-opacity-60">
            <NavbarBrand>
                <Link href="/">
                    <Image src={logo.src} alt="Logo" width={200} height={100} />
                </Link>
            </NavbarBrand>
            {
                links.map((link, index) => (
                    <NavbarItem key={index} className="hidden md:block">
                        <Link href={link.url}>{link.name}</Link>
                    </NavbarItem>
                ))
            }
            <NavbarMenuToggle className="md:hidden" />
            <NavbarMenu>
                {
                    links.map((link, index) => (
                        <NavbarMenuItem key={index}>
                            <Link href={link.url}>{link.name}</Link>
                        </NavbarMenuItem>
                    ))
                }
            </NavbarMenu>
        </Nav>
    )
}