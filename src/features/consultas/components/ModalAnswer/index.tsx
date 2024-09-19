"use client"

import { useEffect, useState } from "react"
import { answerVisit } from "../../actions/answerVisit"
import { Button, Textarea } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import MainForm from "@/features/registro/components/MainForm"
import { FormData } from "@/types"

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
        <div className="absolute top-0 left-0 flex flex-col items-center w-screen bg-black bg-opacity-60 h-full min-h-screen backdrop-blur-sm z-10 overflow-y-scroll select-text cursor-default" onClick={(e) => {e.stopPropagation(); setShowModal(false)}}>
            <div className="flex flex-col gap-4 pt-28 w-[90%] max-w-[40rem]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-white text-xl pb-4">{readonly? `Consulta ${visitId}` :action === 'processed' ? "Procesar consulta" : "Cancelar consulta"}</h2>
                {readonly ?? <p className="text-lg text-white">{action === 'processed'? "Por favor, ingrese el diagnóstico de la consulta y la receta" : "Por favor, ingrese el motivo de la cancelación"}</p>}


                <Textarea isReadOnly={readonly} value={readonly ? propsDiagnosis : undefined} variant="flat" className="bg-gray-200 rounded-md resize-y" placeholder="Diagnóstico e indicaciones" onChange={e => setDiagnosis(e.target.value)} />
                {answerMutation.isError && <p className="text-red-600">Ha ocurrido un error</p>}

                <Button color="primary" disabled={answerMutation.isPending || readonly} fullWidth onClick={handleAnswer}>Enviar</Button>

            </div>
            <MainForm readonly data={data}/>
        </div>
    )
}