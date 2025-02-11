'use client'

import { answerVisit } from "@/actions/features/visits/answer-visit"
import { Textarea } from "@/components/ui/textarea"
import { useDictionary } from "@/dictionaries/dictionary-provider"
import { Button } from "@nextui-org/button"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useSearchParams, useParams } from "next/navigation"

export default function AnswerConsultation() {
  const searchParams = useSearchParams()
  const params = useParams()
  const visitId = parseInt(params.visitId as string)
  const action = searchParams.get('action') as 'processed' | 'canceled'
  const [isFormEnabled, setIsFormEnabled] = useState(false)
  const dictionary = action === 'canceled'? useDictionary().consultations.process_page.cancel : useDictionary().consultations.process_page.process

  useEffect(() => {
    if (!action) {
      setIsFormEnabled(false)
    }
    else {
      setIsFormEnabled(true)
    }
  }, [action])

  const [diagnosis, setDiagnosis] = useState('')
  const answerMutation = useMutation({
    mutationFn: () => answerVisit(visitId, action, diagnosis),
  })

  const handleAnswer = () => {
    try {
      if (!isFormEnabled) return
      answerMutation.mutate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h2 className="text-center text-xl pb-4">{dictionary.title}</h2>
      <p className="text-lg">{dictionary.subtitle}</p>

      <Textarea
        placeholder={dictionary.placeholder}
        rows={4}
        disabled={!isFormEnabled}
        required={false}
        onChange={(e) => setDiagnosis(e.target.value)}
      />


      <Button color="primary" disabled={!isFormEnabled || answerMutation.isPending} onClick={handleAnswer} fullWidth>{dictionary.button_label}</Button>

      {answerMutation.isError && <p className="text-red-600">{dictionary.error}</p>}
      {answerMutation.isSuccess && <p className="text-green-600">{dictionary.success}</p>}
    </>
  )
}