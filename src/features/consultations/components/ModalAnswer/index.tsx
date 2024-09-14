"use client"

import { useState } from "react"
import { answerVisit } from "../../actions/answerVisit"
import { Button, Textarea } from "@nextui-org/react"

interface Props {
    action: 'processed' | 'canceled',
    visitId: number,
    setShowModal: (showModal: boolean) => void
}

export default function ModalAnswer({ action, visitId, setShowModal }: Props) {

    const [diagnosis, setDiagnosis] = useState('')

    const handleAnswer = async () => {
        try {
            await answerVisit(visitId, action, diagnosis)
            setShowModal(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="absolute top-0 left-0 flex items-center justify-center w-screen bg-black bg-opacity-60 h-screen backdrop-blur-sm z-10" onClick={() => setShowModal(false)}>
            <div className="flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-white text-xl pb-4">{action === 'processed' ? "Procesar consulta" : "Cancelar consulta"}</h2>
                <p className="text-lg text-white">{action === 'processed'? "Por favor, ingrese el diagnóstico de la consulta y la receta" : "Por favor, ingrese el motivo de la cancelación"}</p>


                <Textarea variant="flat" className="bg-gray-200 rounded-md resize-y" placeholder="Diagnóstico e indicaciones" onChange={e => setDiagnosis(e.target.value)} />
                <Button color="primary" fullWidth onClick={handleAnswer}>Enviar</Button>
            </div>
        </div>
    )
}