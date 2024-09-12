/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useConsultations } from "../../hooks/useConsultations";
import Consultation from "../Consultation";

import styles from './styles.module.css'

interface Props {
}

const ConsultationsList: React.FC<Props> = () => {
    const { consultationsQuery } = useConsultations();
    return (
        <div className={styles.container}>
            {consultationsQuery.isLoading && <p className="p-[12px]">Cargando...</p>}
            {consultationsQuery.data?.map((consultation: any, index: number) => (
                <Consultation
                    key={index}
                    firstName={consultation.person.first_name}
                    lastName={consultation.person.last_name}
                    reason={consultation.reason}
                    visit_date={consultation.visit_date}
                />
            ))}
        </div>
    )
}

export default ConsultationsList;