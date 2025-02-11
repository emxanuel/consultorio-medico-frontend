import { verifyAndRedirect } from "@/actions/common/verify-and-redirect";
import { getConsultationsByPatient } from "@/actions/features/visits/get-by-patient";
import ConsultationsList from "@/components/features/consultations/consultations-list";
import { getDictionary, Locale } from "@/dictionaries/getDictionary";
import { getSession } from "@auth0/nextjs-auth0";

interface Props {
  params: {
    patientId: string
    enterprise: string
    lang: Locale
  }
}

export default async function Page({ params }: Props) {
  const dictionary = getDictionary(params.lang)
  await verifyAndRedirect(params.enterprise)
  const session = await getSession()
  const token = session?.accessToken || ''
  const { patient, visits } = await getConsultationsByPatient(params.patientId, token)

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
      {dictionary.consultations.medical_record.title} {patient.first_name} {patient.last_name}
      </h1>
      {visits.length > 0 ? (
        <ConsultationsList consultations={visits} />
      ) : (
        <p className="text-lg text-gray-600 italic">No consultations found</p>
      )}
    </main>
  )
}