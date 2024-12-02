import api from "@/api";
import { CreateSubscriptionPayload, CreateSubscriptionResponse } from "@/types/subscriptions";

export const createSubscription = async (data: CreateSubscriptionPayload, token: string) => {
  try {
    const response = await api.post<CreateSubscriptionResponse>("/subscriptions", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
}