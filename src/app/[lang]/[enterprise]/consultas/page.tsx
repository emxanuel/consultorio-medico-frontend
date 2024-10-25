import ConsultationsList from "@/features/consultas/components/ConsultationsList";
import { Metadata } from "next";

import styles from './styles.module.css'
import { verifyAndRedirect } from "@/features/general/actions/verifyAndRedirect";

export const metadata: Metadata = {
    title: "Consultas"
}

export default async function ConsultasPage({params}: {params: {enterprise: string}}) {
    await verifyAndRedirect(params.enterprise)
    return (
        <div className={styles.container}>
            <h1>Consultas</h1>
            <ConsultationsList />
        </div>
    )
}
