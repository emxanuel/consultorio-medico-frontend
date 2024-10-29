import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "@/actions/common/get-accounts";

export const useGetAccounts = (email: string) => {
    const accountsQuery = useQuery({
        queryKey: ['user', email, 'accounts'],
        queryFn: () => getAccounts(email),
    })

    return {accountsQuery}
}