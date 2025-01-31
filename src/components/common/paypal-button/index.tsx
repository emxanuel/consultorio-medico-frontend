'use client'

import useCreateSubscription from "@/hooks/features/subscriptions/useCreateSubscription";
import { userStore } from "@/store/user-store";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PaypalButton() {
  const params = useParams()
  const { user, setUser } = userStore()
  const { createSubscriptionMutation } = useCreateSubscription(user.token)

  useEffect(() => {
    if (createSubscriptionMutation.isSuccess) {
      setUser({ ...user, actualAccount: { ...user.actualAccount!, active: true } })
    }
  }, [createSubscriptionMutation.isSuccess])

  return (
    <div>
      <PayPalButtons
        disabled={createSubscriptionMutation.isPending}
        createSubscription={(_data, actions) => {
          return actions.subscription.create({
            plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || ''
          })
        }}
        onApprove={async (data) => {
          createSubscriptionMutation.mutate({
            accountKey: params.enterprise as string,
            provider: 'paypal',
            price: 1.01,
            externalSubscriptionId: data.subscriptionID as string
          })
        }}
      />
      {createSubscriptionMutation.isError && <p>Error</p>}
      {createSubscriptionMutation.isSuccess && <p>Success</p>}
    </div>
  )
}