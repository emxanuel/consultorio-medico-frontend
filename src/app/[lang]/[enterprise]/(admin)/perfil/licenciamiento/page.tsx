import License from "@/components/features/profile/license";
import { getDictionary, Locale } from "@/dictionaries/getDictionary";

interface Params {
  lang: string;
}

export default function Page({params}: {params: Params}) {
  const dictionary = getDictionary(params.lang as Locale).profile.license
  return (
    <div>
      <h1>{dictionary.title}</h1>
      <License />
    </div>
  )
}