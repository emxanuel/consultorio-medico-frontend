import { createPatient } from "@/actions/features/register/create-patient";
import { FormData } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useCreateClient(formData: FormData, accountKey: string, token: string) {
  const createClientMutation = useMutation({
    mutationFn: () =>
      createPatient(formData, accountKey, token),
  });

  return { createClientMutation };
}
