import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/actions/features/accounts/get-account";

export const useGetAccount = (key: string, accessToken: string) => {
    const accountQuery = useQuery({
        queryKey: ['account', key],
        queryFn: () => getAccount(key, accessToken),
    })

    return {accountQuery}
}