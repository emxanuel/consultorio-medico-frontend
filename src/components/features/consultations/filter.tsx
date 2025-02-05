'use client'

import { Input } from "@nextui-org/input"
import { DatePicker } from "@nextui-org/date-picker"
import { Checkbox } from "@nextui-org/react"
import { useDictionary } from "@/dictionaries/dictionary-provider"

interface Props {
    setName: (name: string) => void
    setFrom: (from: string | null) => void
    setTo: (to: string | null) => void
    setStatuses: (statuses: string[]) => void,
    statuses: string[]
}

export default function Filter({ setName, setFrom, setTo, setStatuses, statuses }: Props) {
    
    const dictionary = useDictionary()

    const handleStatusChange = (status: string) => {
        if (statuses.includes(status)) {
            setStatuses(statuses.filter(s => s !== status))
        } else {
            setStatuses([...statuses, status])
        }
    }

    return (
        <div className="w-[90%] max-w-[40rem] flex flex-col gap-4 pb-6">
            <Input onChange={e => setName(e.target.value)} fullWidth variant="bordered" label={dictionary.consultations.search} />
            <div className="flex flex-col md:flex-row gap-2">
                <DatePicker showMonthAndYearPickers onChange={e => setFrom(e?.toString() || null)} label={`${dictionary.consultations.from}: `} />
                <DatePicker showMonthAndYearPickers onChange={e => setTo(e?.toString() || null)} label={`${dictionary.consultations.to}: `} />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <Checkbox defaultSelected onChange={e => handleStatusChange(e.target.name)} name="pendient">{dictionary.consultations.pending}</Checkbox>
                <Checkbox onChange={e => handleStatusChange(e.target.name)} name="processed">{dictionary.consultations.processed}</Checkbox>
                <Checkbox onChange={e => handleStatusChange(e.target.name)} name="canceled">{dictionary.consultations.cancelled}</Checkbox>
            </div>
        </div>
    )
}