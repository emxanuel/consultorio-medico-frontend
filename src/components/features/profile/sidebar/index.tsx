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


export function SettingsSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const params = useParams()
  
  const navItems = [
    { label: "Perfil", icon: User, href: `/${params.lang}/${params.enterprise}/perfil` },
    { label: "Licenciamiento", icon: Shield, href: `/${params.lang}/${params.enterprise}/perfil/licenciamiento` },
    { label: "Configuración", icon: Settings, href: `/${params.lang}/${params.enterprise}/perfil/configuracion` },
    { label: "Seguridad", icon: Lock, href: `/${params.lang}/${params.enterprise}/perfil/seguridad` },
  ]

  return (
    <ShadcnSidebar
      collapsible="icon"
    >
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Settings</h2>
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
      <div className="mt-auto border-t p-4">
        <SidebarTrigger>
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </SidebarTrigger>
      </div>
    </ShadcnSidebar>
  )
}

