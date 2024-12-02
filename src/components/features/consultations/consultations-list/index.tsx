/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { useConsultations } from "../../../../hooks/features/consultations/useConsultations";
import Consultation from "../consultation";
import Filter from "../filter";

import styles from './styles.module.css'
import { userStore } from "@/store/user-store";
import { useDictionary } from "@/dictionaries/dictionary-provider";

interface Props {
}

const ConsultationsInactiveAccount = () => {
    const dictionary = useDictionary().consultations

    return (
        <div className="p-[12px]">
            <p>{dictionary.inactive_account_message}</p>
        </div>
    )
}

const ConsultationsActiveAccount: React.FC<Props> = () => {
    const dictionary = useDictionary()

    const [name, setName] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [statuses, setStatuses] = useState<string[]>(['pendient'])
    const { user } = userStore()
    const actualAccount = user.actualAccount
    const token = user.token
    const { consultationsQuery } = useConsultations(name, from, to, statuses, actualAccount?.account_key as string, token);

    useEffect(() => {
        consultationsQuery.refetch()
    }, [name, from, to, statuses])

    return (
        <div className={styles.container}>
            <Filter setFrom={setFrom} setName={setName} setTo={setTo} statuses={statuses} setStatuses={setStatuses} />
            {consultationsQuery.isLoading && <p className="p-[12px]">{dictionary.common.loading}</p>}
            {consultationsQuery.data?.length === 0 && <p className="p-[12px]">{dictionary.consultations.no_consultations}</p>}
            {consultationsQuery.data?.map((consultation: any, index: number) => (
                <Consultation
                    key={index}
                    firstName={consultation.person.first_name}
                    lastName={consultation.person.last_name}
                    reason={consultation.reason}
                    visit_date={consultation.visit_date}
                    id={consultation.id}
                    status={consultation.status}
                    diagnosis={consultation.diagnosis}
                    refetch={consultationsQuery.refetch}
                    patient_id={consultation.person.id}
                />
            ))}
        </div>
    )
}

const ConsultationsList: React.FC<Props> = () => {
    const { user } = userStore()
    return (
        <>
            {user.actualAccount?.active ? <ConsultationsActiveAccount /> : <ConsultationsInactiveAccount />}
        </>
    )
}

export default ConsultationsList;