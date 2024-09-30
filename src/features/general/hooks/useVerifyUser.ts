import { useQuery } from "@tanstack/react-query";
import { verifyUser } from "../../general/actions/verifyUser";

export const useVerifyUser = (email: string) => {
    const verifyUserQuery = useQuery({
        queryKey: ['verifyUser'],
        queryFn: () => verifyUser(email),
    })

    return {verifyUserQuery}
}
