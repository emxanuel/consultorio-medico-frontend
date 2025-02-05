"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Phone, MapPin, User, Heart, FileText } from "lucide-react"
import { FormData } from "@/types/form-data"
import { useDictionary } from "@/dictionaries/dictionary-provider"

interface Props {
  data: FormData
}

export default function ConsultationDetails({ data }: Props) {
  const dictionary = useDictionary()
  return (
    <ScrollArea className="h-[calc(40vh-2rem)] px-4" onClick={(e) => e.stopPropagation()}>
      <div className="container mx-auto py-6 space-y-6 max-w-4xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">{data.firstName} {data.lastName}</CardTitle>
            <Badge variant="outline">{data.documentId}</Badge>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CalendarDays className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{dictionary.form_patients_registration.form.birthdate}</p>
                  <p className="text-sm text-muted-foreground">{data.birthDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{dictionary.form_patients_registration.form.phone}</p>
                  <p className="text-sm text-muted-foreground">{data.cellphone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{dictionary.form_patients_registration.form.address}</p>
                  <p className="text-sm text-muted-foreground">{data.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{dictionary.form_patients_registration.form.age}</p>
                  <p className="text-sm text-muted-foreground">{data.age}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Consultation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Consulta Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.reason}</p>
                <p className="text-sm text-muted-foreground">{data.reason}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Contacto de Emergencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.emergency_contact.name}</p>
                <p className="text-sm text-muted-foreground">{data.emergencyContactName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.emergency_contact.relationship}</p>
                <p className="text-sm text-muted-foreground">{data.emergencyContactRelationship}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.emergency_contact.phone}</p>
                <p className="text-sm text-muted-foreground">{data.emergencyContactCellphone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.emergency_contact.residential_phone}</p>
                <p className="text-sm text-muted-foreground">{data.residentialPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insurance Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Información de ARS</CardTitle>
            <Badge>{data.hasAssurance ? dictionary.form_patients_registration.form.assurance.yes : dictionary.form_patients_registration.form.assurance.no}</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.assurance.name}</p>
                <p className="text-sm text-muted-foreground">{data.ARSName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.assurance.card_holder}</p>
                <p className="text-sm text-muted-foreground">{data.ARSCardholder}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.assurance.plan}</p>
                <p className="text-sm text-muted-foreground">{data.ARSPlan}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{dictionary.form_patients_registration.form.assurance.contract_number}</p>
                <p className="text-sm text-muted-foreground">{data.ARSContractNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground text-center pb-4">{dictionary.form_patients_registration.readonly_form}</p>
      </div>
    </ScrollArea>
  )
}

