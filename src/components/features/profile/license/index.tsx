'use client'

import PaypalButton from "@/components/common/paypal-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useDictionary } from "@/dictionaries/dictionary-provider"
import { userStore } from "@/store/user-store"
import { CheckCircle, CreditCard } from "lucide-react"

const LicenseActiveUser = () => {
  const { user } = userStore()
  const dictionary = useDictionary().settings.license.active_account

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{dictionary.title}</CardTitle>
          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="w-4 h-4 mr-1" />
            Cuenta activa
          </Badge>
        </div>
        <CardDescription>Tu licencia está activa y al día</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Estado de la licencia</p>
                <p className="text-sm text-muted-foreground">Activa</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Titular</p>
                <p className="text-sm text-muted-foreground">{user?.email || "Usuario"}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const LicenseInactiveUser = () => {
  const { user } = userStore()
  const dictionary = useDictionary().settings.license.inactive_account

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{dictionary.title}</CardTitle>
        <CardDescription>{dictionary.message}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">{dictionary.cta}</h3>
            <p className="text-sm text-muted-foreground">{dictionary.cta_2}</p>
          </div>
          <Separator />
          <div className="p-6 space-y-4">
            <PaypalButton />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function License () {  
  const { user } = userStore()

  return (
    user.actualAccount?.active ? <LicenseActiveUser /> : <LicenseInactiveUser />
  )
}