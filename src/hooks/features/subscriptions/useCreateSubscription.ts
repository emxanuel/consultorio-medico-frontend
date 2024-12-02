import { createSubscription } from "@/actions/features/subscriptions/create";
import { CreateSubscriptionPayload } from "@/types/subscriptions";
import { useMutation } from "@tanstack/react-query";

export default function useCreateSubscription(token: string) {
  const createSubscriptionMutation = useMutation({
    mutationKey: ['subscriptions', 'create'],
    mutationFn: (data: CreateSubscriptionPayload) => createSubscription(data, token)
  })

  return { createSubscriptionMutation }
}