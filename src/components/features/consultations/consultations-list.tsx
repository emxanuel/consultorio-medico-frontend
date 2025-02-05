/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { useConsultations } from "@/hooks/features/consultations/useConsultations";
import Consultation from "./consultation";
import Filter from "./filter";

import { userStore } from "@/store/user-store";
import { useDictionary } from "@/dictionaries/dictionary-provider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import ConsultationRow from "./consultation-row";

interface Props {
    consultations?: any[]
}

const ConsultationsInactiveAccount = () => {
    const dictionary = useDictionary().consultations

    return (
        <div className="p-[12px]">
            <p>{dictionary.inactive_account_message}</p>
        </div>
    )
}

const ConsultationsActiveAccount = () => {
    const dictionary = useDictionary()

    const [name, setName] = useState('')
    const [from, setFrom] = useState<string | null>(null)
    const [to, setTo] = useState<string | null>(null)
    const [statuses, setStatuses] = useState<string[]>(['pendient'])
    const { user } = userStore()
    const actualAccount = user.actualAccount
    const { consultationsQuery } = useConsultations(name, from, to, statuses, actualAccount?.account_key as string);

    useEffect(() => {
        consultationsQuery.refetch()
    }, [name, from, to, statuses])

    return (
        <div className='flex flex-col gap-4 w-11/12 max-w-2xl pb-8'>
            <Filter setFrom={setFrom} setName={setName} setTo={setTo} statuses={statuses} setStatuses={setStatuses} />
            {consultationsQuery.isLoading && <p className="p-[12px]">{dictionary.common.loading}</p>}
            {consultationsQuery.data?.length === 0 && <p className="p-[12px]">{dictionary.consultations.no_consultations}</p>}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{dictionary.consultations.table.titles.patient}</TableHead>
                        <TableHead>{dictionary.consultations.table.titles.reason}</TableHead>
                        <TableHead>{dictionary.consultations.table.titles.date}</TableHead>
                        <TableHead className="text-right">{dictionary.consultations.table.titles.actions}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {consultationsQuery.data?.map((consultation: any, index: number) => (
                        <ConsultationRow 
                            displayName={`${consultation.person.first_name} ${consultation.person.last_name}`}
                            reason={consultation.reason}
                            visitDate={dayjs(consultation.visit_date).format('DD/MMM/YYYY')}
                            status={consultation.status}
                            patientId={consultation.person.id}
                            visitId={consultation.id}
                            diagnosis={consultation.diagnosis}
                        />
                    ))}
                </TableBody>
            </Table>  
        </div>
    )
}

interface PreloadedConsultationsProps {
    consultations: any[]
}

const PreloadedConsultations: React.FC<PreloadedConsultationsProps> = ({ consultations }) => {
    return (
        <div className='flex flex-col gap-4 w-11/12 max-w-2xl pb-8'>
            {consultations.map((consultation: any, index: number) => (
                <Consultation
                    key={index}
                    firstName={consultation.person.first_name}
                    lastName={consultation.person.last_name}
                    reason={consultation.reason}
                    visit_date={consultation.visit_date}
                    id={consultation.id}
                    status={consultation.status}
                    diagnosis={consultation.diagnosis}
                    refetch={() => { }}
                    patient_id={consultation.person.id}
                    hideDrawer
                />
            ))}
        </div>
    )
}

const ConsultationsList: React.FC<Props> = ({ consultations }) => {
    const { user } = userStore()

    if (consultations) {
        return <PreloadedConsultations consultations={consultations} />
    }

    return (
        <>
            {user.actualAccount?.active ? <ConsultationsActiveAccount /> : <ConsultationsInactiveAccount />}
        </>
    )
}

export default ConsultationsList;