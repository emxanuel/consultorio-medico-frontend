"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { User, Shield, Bell, Settings, Lock, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useDictionary } from "@/dictionaries/dictionary-provider"


export function SettingsSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const params = useParams()
  const dictionary = useDictionary().profile.sidebar
  
  const navItems = [
    { label: dictionary.profile, icon: User, href: `/${params.lang}/${params.enterprise}/perfil` },
    { label: dictionary.license, icon: Shield, href: `/${params.lang}/${params.enterprise}/perfil/licenciamiento` },
    { label: dictionary.settings, icon: Settings, href: `/${params.lang}/${params.enterprise}/perfil/configuracion` },
    { label: dictionary.security, icon: Lock, href: `/${params.lang}/${params.enterprise}/perfil/seguridad` },
  ]

  return (
    <nav className="flex flex-col h-full w-64 bg-white border-r">
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">{dictionary.settings}</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={isCollapsed ? item.label : undefined}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </nav>
  )
}

