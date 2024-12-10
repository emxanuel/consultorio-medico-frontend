'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@nextui-org/drawer";
import { useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { userStore } from "@/store/user-store";
import { useConsultationsByPatient } from "@/hooks/features/consultations/useConsultationsByPatient";
import ConsultationsList from "../consultations-list";
import { useDictionary } from "@/dictionaries/dictionary-provider";

interface Props {
  name: string
  documentId: string
}

export default function DrawerPatientHistory({ name, documentId }: Props) {
  const dictionary = useDictionary()
  const { user } = userStore()
  const { consultationsByPatientQuery } = useConsultationsByPatient(documentId, user.token)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button variant="light" onPress={onOpen}>{dictionary.consultations.see_record}</Button>
      <Drawer
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        backdrop="blur"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 font-semibold">{dictionary.consultations.medical_record.title} {name} ({documentId})</DrawerHeader>
              <DrawerBody>
                {
                  consultationsByPatientQuery.isLoading? (
                    <p>{dictionary.common.loading}</p>
                  ) : (
                    <ConsultationsList 
                      consultations={consultationsByPatientQuery.data}
                    />
                  )
                }
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {dictionary.consultations.medical_record.close}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}