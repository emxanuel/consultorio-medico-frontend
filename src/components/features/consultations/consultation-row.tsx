'use client'

import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ModalAnswer from "./modal-answer";
import { useState } from "react";
import { useDictionary } from "@/dictionaries/dictionary-provider";
import { usePatient } from "@/hooks/common/usePatient";
import { FormData, PrimaryInsuredRelationship } from "@/types/form-data";
import useRedirect from "@/hooks/common/useRedirect";

interface Props {
  displayName: string
  reason: string
  visitDate: string
  status: number
  patientId: number
  visitId: number
  diagnosis: string
}

export default function ConsultationRow({
  displayName,
  reason,
  visitDate,
  status,
  patientId,
  visitId,
  diagnosis
}: Props) {
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState<'processed' | 'canceled'>('processed')
  const dictionary = useDictionary().consultations
  const { patientQuery } = usePatient(patientId)
  const requestData = patientQuery.data
  const data: FormData = {
    firstName: requestData?.first_name!,
    lastName: requestData?.last_name!,
    age: requestData?.age.toString() ?? '0',
    gender: requestData?.gender!,
    maritalStatus: requestData?.marital_status!,
    birthDate: requestData?.birth_date!,
    birthPlace: requestData?.birth_place!,
    nationality: requestData?.nationality!,
    religion: requestData?.religion!,
    ocupation: requestData?.occupation!,
    documentId: requestData?.document_id!,
    address: requestData?.address!,
    residentialPhone: requestData?.residential_phone!,
    cellphone: requestData?.cellphone!,
    emergencyContactName: requestData?.emergency_contact?.[0]?.name!,
    emergencyContactResidentialPhone: requestData?.emergency_contact?.[0]?.residential_phone!,
    emergencyContactCellphone: requestData?.emergency_contact?.[0]?.cellphone!,
    emergencyContactRelationship: requestData?.emergency_contact?.[0]?.relationship!,
    emergencyContactAddress: requestData?.emergency_contact?.[0]?.address!,
    hasAssurance: requestData?.insurance?.[0] !== undefined,
    ARSName: requestData?.insurance?.[0].ars_name!,
    ARSCardholder: requestData?.insurance?.[0].ars_cardholder!,
    ARSPrimaryInsured: requestData?.insurance?.[0].ars_primary_insured!,
    ARSPlan: requestData?.insurance?.[0].ars_plan!,
    ARSContractNumber: requestData?.insurance?.[0].ars_contract_number!,
    ARSPrimaryInsuredRelationship: requestData?.insurance?.[0].ars_primary_insured_relationship! as PrimaryInsuredRelationship,
    reason: reason
  }

  const { redirect } = useRedirect()

  const handleProcessClick = () => {
    redirect(`/consultas/${visitId}/procesar?action=processed`)
  }

  const handleCancelClick = () => {
    redirect(`/consultas/${visitId}/procesar?action=canceled`)
  }

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{displayName}</TableCell>
        <TableCell>{reason}</TableCell>
        <TableCell>{visitDate}</TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => redirect(`/pacientes/${data.documentId}/historial`)}>
              {dictionary.see_record}
            </Button>
            {status === 0 && (
              <>
                <Button variant="default" size="sm" className="bg-emerald-500 hover:bg-emerald-600" onClick={handleProcessClick}>
                  {dictionary.process}
                </Button>
                <Button variant="destructive" size="sm" onClick={handleCancelClick}>
                  {dictionary.cancel}
                </Button>
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
      {showModal && <ModalAnswer propsDiagnosis={diagnosis} data={data} refetch={() => { }} readonly={status !== 0} action={action} visitId={visitId} setShowModal={setShowModal} />}
    </>
  )
}