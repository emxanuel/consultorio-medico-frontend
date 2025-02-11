import { getConsultation } from "@/actions/features/visits/get-one"
import ConsultationDetails from "@/components/features/consultations/consultation-details"
import { Input } from "@/components/ui/input"
import { PrimaryInsuredRelationship } from "@/types/form-data"
import { getSession } from "@auth0/nextjs-auth0"
import { Button } from "@nextui-org/button"
import { Textarea } from "@/components/ui/textarea"
import { useDictionary } from "@/dictionaries/dictionary-provider"
import { getDictionary, Locale } from "@/dictionaries/getDictionary"
import AnswerConsultation from "@/components/features/consultations/answer-form"

interface Props {
  params: {
    visitId: string,
    lang: Locale
  }
}

export default async function Page({ params }: Props) {
  const session = await getSession()
  const token = session?.accessToken || ''
  const dictionary = getDictionary(params.lang).consultations.process_page.process

  const consultation = await getConsultation(params.visitId, token)

  return (
    <main className="flex justify-start flex-1 overflow-hidden">
      <div className="flex flex-col gap-4 w-7/12 p-4 h-full">        
        <AnswerConsultation />
      </div>
      <div className="w-5/12 overflow-y-auto h-full">
        <ConsultationDetails
          data={{
            firstName: consultation.person.first_name,
            lastName: consultation.person.last_name,
            reason: consultation.reason,
            age: consultation.person.age.toString(),
            address: consultation.person.address,
            birthDate: consultation.person.birth_date,
            birthPlace: consultation.person.birth_place,
            cellphone: consultation.person.cellphone,
            documentId: consultation.person.document_id,
            emergencyContactAddress: consultation.person.emergency_contact?.[0]?.address!,
            emergencyContactCellphone: consultation.person.emergency_contact?.[0]?.cellphone!,
            emergencyContactName: consultation.person.emergency_contact?.[0]?.name!,
            emergencyContactRelationship: consultation.person.emergency_contact?.[0]?.relationship!,
            emergencyContactResidentialPhone: consultation.person.emergency_contact?.[0]?.residential_phone!,
            gender: consultation.person.gender,
            maritalStatus: consultation.person.marital_status,
            religion: consultation.person.religion!,
            hasAssurance: consultation.person.insurance?.[0] !== undefined,
            ARSName: consultation.person.insurance?.[0].ars_name!,
            ARSCardholder: consultation.person.insurance?.[0].ars_cardholder!,
            ARSContractNumber: consultation.person.insurance?.[0].ars_contract_number!,
            ARSPlan: consultation.person.insurance?.[0].ars_plan!,
            nationality: consultation.person.nationality,
            ocupation: consultation.person.occupation!,
            residentialPhone: consultation.person.residential_phone!,
            ARSPrimaryInsured: consultation.person.insurance?.[0].ars_primary_insured!,
            ARSPrimaryInsuredRelationship: consultation.person.insurance?.[0].ars_primary_insured_relationship! as PrimaryInsuredRelationship,
          }}
        />
      </div>
    </main>
  )
}