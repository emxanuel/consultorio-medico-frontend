import ConsultationsList from "@/components/features/consultations/consultations-list";
import { Metadata } from "next";

import styles from './styles.module.css'
import { verifyAndRedirect } from "@/actions/common/verify-and-redirect";
import { getDictionary } from "@/dictionaries/getDictionary";
import { Language } from "@/types/language";

export const metadata: Metadata = {
    title: "Consultas"
}

export default async function ConsultasPage({params}: {params: {enterprise: string, lang: string}}) {
    await verifyAndRedirect(params.enterprise)
    const dictionary = getDictionary(params.lang as Language).consultations
    return (
        <div className={styles.container}>
            <h1>{dictionary.title}</h1>
            <ConsultationsList />
        </div>
    )
}
