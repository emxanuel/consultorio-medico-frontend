import { useQuery } from "@tanstack/react-query";
import { verifyUser } from "../actions/verifyUser";

export const useVerifyUser = (email: string) => {
    const verifyUserQuery = useQuery({
        queryKey: ['verifyUser'],
        queryFn: () => verifyUser(email),
    })

    return {verifyUserQuery}
}
