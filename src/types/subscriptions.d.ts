export type CreateSubscriptionPayload = {
  accountKey: string;
  provider: string;
  price: number;
  externalSubscriptionId: string;
}

export type CreateSubscriptionResponse = {
  message: string
}