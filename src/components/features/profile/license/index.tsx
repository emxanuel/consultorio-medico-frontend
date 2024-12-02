'use client'

import PaypalButton from "@/components/common/paypal-button"
import { useDictionary } from "@/dictionaries/dictionary-provider"
import { userStore } from "@/store/user-store"

const LicenseActiveUser = () => {
  const { user } = userStore()
  const dictionary = useDictionary().profile.license.active_account
  return (
    <div>
      <p>{dictionary.title}</p>
    </div>
  )
}

const LicenseInactiveUser = () => {
  const { user } = userStore()
  const dictionary = useDictionary().profile.license.inactive_account
  return (
    <div>
      <p>{dictionary.title}</p>
      <p>{dictionary.message}</p>
      <PaypalButton />
    </div>
  )
}

export default function License () {
  const { user } = userStore()
  return (
    user.actualAccount?.active ? <LicenseActiveUser /> : <LicenseInactiveUser />
  )
}