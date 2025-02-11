'use client'

import { useParams, useRouter } from "next/navigation";


export default function useRedirect() {
  const params = useParams();
  const { enterprise, lang } = params;
  const router = useRouter();
  
  const redirect = (url: string) => {
    const redirectUrl = `/${lang}/${enterprise}/${url}`;
    router.push(redirectUrl);
  }

  return { redirect }
}