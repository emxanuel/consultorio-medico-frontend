import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "@/actions/features/accounts/get-accounts";

export const useGetAccounts = (email: string, accessToken: string) => {
    const accountsQuery = useQuery({
        queryKey: ['user', email, 'accounts'],
        queryFn: () => getAccounts(email, accessToken),
    })

    return {accountsQuery}
}