import { useQuery } from "@tanstack/react-query";
import { getAccount } from "../actions/getAccount";

export const useGetAccount = (key: string) => {
    const accountQuery = useQuery({
        queryKey: ['account', key],
        queryFn: () => getAccount(key),
    })

    return {accountQuery}
}