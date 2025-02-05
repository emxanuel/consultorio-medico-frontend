"use client"

import { useEffect, useState } from "react"
import { answerVisit } from "@/actions/features/visits/answer-visit"
import { Button, Textarea } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import MainForm from "@/components/features/register/main-form"
import { FormData } from "@/types/form-data"
import { X } from "lucide-react"
import ConsultationDetails from "./consultation-details"

interface Props {
    action: 'processed' | 'canceled',
    visitId: number,
    setShowModal: (showModal: boolean) => void,
    refetch: () => void,
    readonly?: boolean,
    data: FormData,
    propsDiagnosis?: string  
}

export default function ModalAnswer({ action, visitId, setShowModal, refetch, readonly, data, propsDiagnosis }: Props) {
    const [diagnosis, setDiagnosis] = useState('')
    const answerMutation = useMutation({
        mutationFn: () => answerVisit(visitId, action, diagnosis),
    })

    useEffect(() => {
        if (answerMutation.isSuccess) {
            refetch()
            setShowModal(false)
        }
    }, [answerMutation.isSuccess, refetch, setShowModal])

    const handleAnswer = () => {
        try {
            answerMutation.mutate()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="fixed top-0 left-0 flex flex-col md:flex-row-reverse md:justify-center items-center w-screen bg-black bg-opacity-60 h-full min-h-screen backdrop-blur-sm z-10 overflow-y-scroll select-text cursor-default" onClick={(e) => {e.stopPropagation(); setShowModal(false)}}>
            <Button className="absolute right-0 mt-28 mr-4 top-0" variant="bordered" onClick={() => setShowModal(false)}>
                <X className="text-white"/>
            </Button>
            <div className="flex flex-col gap-4 w-[90%] max-w-[40rem]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-white text-xl pb-4">{readonly? `Consulta ${visitId}` :action === 'processed' ? "Procesar consulta" : "Cancelar consulta"}</h2>
                {readonly ?? <p className="text-lg text-white">{action === 'processed'? "Por favor, ingrese el diagnóstico de la consulta y la receta" : "Por favor, ingrese el motivo de la cancelación"}</p>}


                <Textarea isReadOnly={readonly} value={readonly ? propsDiagnosis : undefined} variant="flat" className="bg-gray-200 rounded-md resize-y" placeholder="Diagnóstico e indicaciones" onChange={e => setDiagnosis(e.target.value)} />
                {answerMutation.isError && <p className="text-red-600">Ha ocurrido un error</p>}

                <Button color="primary" disabled={answerMutation.isPending || readonly} fullWidth onClick={handleAnswer}>Enviar</Button>

            </div>
            <ConsultationDetails data={data}/>
        </div>
    )
}