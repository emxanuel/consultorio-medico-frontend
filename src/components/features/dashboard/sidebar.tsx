'use client'

import Languages from '@/components/common/navbar/languages'
import { getDictionary, Locale } from '@/dictionaries/getDictionary'
import { Home, CirclePlus, User, FileText, ChevronLeft, ChevronRight, DoorOpen, QrCode } from 'lucide-react'
import Link from "next/link"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ModalQR from '@/components/common/modal-qr'

interface IProps {
  accountKey: string
  lang: Locale
}

export function Sidebar({ accountKey, lang }: IProps) {
  const createUrl = (path: string) => `/${accountKey}/${path}`
  const dictionary = getDictionary(lang).navbar
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isModalQrOpen, setIsModalQrOpen] = useState(false)
  const { open } = useSidebar()


  const navItems = [
    { icon: Home, label: "Dashboard", href: createUrl('') },
    { icon: CirclePlus, label: dictionary.register, href: createUrl('registro') },
    { icon: FileText, label: dictionary.consultations, href: createUrl('consultas') },
  ]

  return (
    <ShadcnSidebar collapsible='icon' className="flex h-screen w-64 flex-col border-r py-4 bg-gray-100">
      <SidebarContent className="flex-1 overflow-y-auto py-4">
        <SidebarMenu className="space-y-2 px-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link
                href={item.href}
                className="flex items-center rounded-lg py-2 text-gray-700 hover:bg-gray-200"
              >
                <item.icon className="h-5 w-5" />
                {open && <span className="ml-3">{item.label}</span>}
              </Link>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <Button onClick={() => setIsModalQrOpen(true)} variant='ghost' className="w-full flex justify-start p-0">
              <QrCode />
              {open && dictionary.qr_code}
            </Button>
          </SidebarMenuItem>
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
      {isModalQrOpen && (
        <ModalQR
          onclose={() => setIsModalQrOpen(false)}
        />
      )}
    </ShadcnSidebar>
  )
}