export type IGetAccountResponse = {
  account_key: string
  created_at: string
  name: string
  active: boolean
  admin: {
    email: string
  }
}

export type IGetAccountsResponse = {
  account_key: string
  name: string
  active: boolean
}[]