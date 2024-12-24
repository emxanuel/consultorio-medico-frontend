import { me } from "@/actions/features/auth/me"
import { userStore } from "@/store/user-store"
import { useQuery } from "@tanstack/react-query"

export const useMe = () => {
  const { user } = userStore()
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => me(user.email, user.token),
  })
}