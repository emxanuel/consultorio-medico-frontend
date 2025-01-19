import MainForm from "@/components/features/register/main-form";
import { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";
import { Language } from "@/types/language";

export const metadata: Metadata = {
  title: "Registro"
}

export default async function EmergencyRegister({params}: {params: {lang: string}}) {
  const dictionary = await getDictionary(params.lang as Language)

  return (
    <div className='flex flex-col items-center flex-1 py-4'>
      <h1 className="text-2xl font-bold">{dictionary.form_patients_registration.title}</h1>
      <MainForm />
    </div>
  );
}
