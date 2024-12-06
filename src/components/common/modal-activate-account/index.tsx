import { userStore } from "@/store/user-store";
import { Modal, ModalHeader, ModalContent } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Link from "next/link";

interface Props {
  isVisible: boolean;
}

export default function ModalActivateAccount() {
  const { hasViewedActivateAccount, setHasViewedActivateAccount } = userStore()
  
  const handleHasViewed = () => {
    setHasViewedActivateAccount(true)
  }
  return (
    <Modal className="h-[50vh] flex flex-col items-center w-full" isOpen={!hasViewedActivateAccount} onClose={handleHasViewed}>
      <ModalContent className="flex flex-col justify-between">
        <ModalHeader className="border-b border-border px-6 py-4">Activate account</ModalHeader>
        <p className="">
          Your account is not activated yet. Please activate it to continue using the platform.
        </p>
        <div className="flex justify-end gap-2 p-2 w-full">
          <Button onClick={handleHasViewed} className="flex justify-end space-x-4 w-10 h-10" color="danger" variant="bordered">Cancel</Button>
          <Link onClick={handleHasViewed} href='/perfil/licenciamiento' className="bg-green-400 rounded-lg p-2 text-white">Activate</Link>
        </div>
      </ModalContent>
    </Modal>
  )
}