'use client'

import { Input } from "@nextui-org/input"
import { DatePicker } from "@nextui-org/date-picker"
import { Checkbox } from "@nextui-org/react"

interface Props {
    setName: (name: string) => void
    setFrom: (from: string) => void
    setTo: (to: string) => void
    setStatuses: (statuses: string[]) => void,
    statuses: string[]
}

export default function Filter({ setName, setFrom, setTo, setStatuses, statuses }: Props) {

    const handleStatusChange = (status: string) => {
        if (statuses.includes(status)) {
            setStatuses(statuses.filter(s => s !== status))
        } else {
            setStatuses([...statuses, status])
        }
    }

    return (
        <div className="w-[90%] max-w-[40rem] flex flex-col gap-4 pb-6">
            <Input onChange={e => setName(e.target.value)} fullWidth variant="bordered" label='Buscar por nombre' />
            <div className="flex flex-col md:flex-row gap-2">
                <DatePicker showMonthAndYearPickers onChange={e => setFrom(e.toString())} label='Desde: ' />
                <DatePicker showMonthAndYearPickers onChange={e => setTo(e.toString())} label='Hasta: ' />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <Checkbox defaultSelected onChange={e => handleStatusChange(e.target.name)} name="pendient">Pendientes</Checkbox>
                <Checkbox onChange={e => handleStatusChange(e.target.name)} name="processed">Procesadas</Checkbox>
                <Checkbox onChange={e => handleStatusChange(e.target.name)} name="canceled">Canceladas</Checkbox>
            </div>
        </div>
    )
}