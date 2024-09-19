/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { useConsultations } from "../../hooks/useConsultations";
import Consultation from "../Consultation";
import Filter from "../Filter";

import styles from './styles.module.css'

interface Props {
}

const ConsultationsList: React.FC<Props> = () => {

    const [name, setName] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [statuses, setStatuses] = useState<string[]>(['pendient'])
    const { consultationsQuery } = useConsultations(name, from, to, statuses);

    useEffect(() => {
        consultationsQuery.refetch()
    }, [name, from, to, statuses, consultationsQuery])

    return (
        <div className={styles.container}>
            <Filter setFrom={setFrom} setName={setName} setTo={setTo} statuses={statuses} setStatuses={setStatuses} />
            {consultationsQuery.isLoading && <p className="p-[12px]">Cargando...</p>}
            {consultationsQuery.data?.length === 0 && <p className="p-[12px]">No hay consultas</p>}
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

export default ConsultationsList;