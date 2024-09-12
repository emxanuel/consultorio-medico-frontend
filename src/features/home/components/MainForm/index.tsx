"use client"

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Select } from '@nextui-org/select'
import { SelectItem } from '@nextui-org/select'
import { DatePicker } from '@nextui-org/date-picker'
// import { Input, Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { FormData } from '@/types'
import { MaritalStatus, PrimaryInsuredRelationship, Gender } from '@/types'

import styles from './styles.module.css'
import { RadioButton } from 'primereact/radiobutton'


export default function MainForm() {

    const [showARS, setShowARS] = useState(false)

    const maritalStatuses = Object.values(MaritalStatus).filter((value) => typeof value === 'string')
    const primaryInsuredRelationships = Object.values(PrimaryInsuredRelationship).filter((value) => typeof value === 'string')
    const genders = Object.values(Gender).filter((value) => typeof value === 'string')

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        age: "",
        gender: Gender.masculine,
        maritalStatus: MaritalStatus.single,
        birthDate: "",
        birthPlace: "",
        nationality: "",
        religion: "",
        ocupation: "",
        documentId: "",
        address: "",
        residentialPhone: "",
        cellphone: "",
        emergencyContactName: "",
        emergencyContactResidentialPhone: "",
        emergencyContactCellphone: "",
        emergencyContactRelationship: "",
        emergencyContactAddress: "",
        hasAssurance: false,
        ARSName: "",
        ARSCardholder: "",
        ARSPrimaryInsured: "",
        ARSPlan: "",
        ARSContractNumber: "",
        ARSPrimaryInsuredRelationship: PrimaryInsuredRelationship.spouse
    })

    useEffect(() => {
        if (formData.hasAssurance) {
            setShowARS(true)
        } else {
            setShowARS(false)
        }
    }, [formData.hasAssurance])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <form className={styles.container}>
            <div className={styles.personalInformation}>
                <h1 className='text-xl'>Información del paciente</h1>
                <div className={styles.inputs}>
                    <Input onChange={handleChange} name='firstName' placeholder='Nombre del paciente' aria-label='Nombre del paciente' />
                    <Input onChange={handleChange} name='lastName' placeholder='Apellido' aria-label='Apellido' />
                    <Input type='number' placeholder='Edad' max={120} aria-label='Edad' />
                    <Select className='border border-[#ccc]' value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })} placeholder='Genero' aria-label='Genero'>
                        {genders.map(g => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                    </Select>
                    <Select className='border border-[#ccc]' value={formData.maritalStatus} onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as MaritalStatus })} placeholder='Estado civil' aria-label='Estado civil'>
                        {maritalStatuses.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </Select>
                    <div className='flex flex-col '>
                        <label>Fecha de nacimiento</label>
                        <DatePicker onChange={(e) => setFormData({ ...formData, birthDate: e.toDate('en_us').toDateString() })} aria-label='Fecha de nacimiento' />
                    </div>
                    <Input onChange={handleChange} name='birthPlace' placeholder='Lugar de nacimiento' aria-label='Lugar de nacimiento' />
                    <Input onChange={handleChange} name='nationality' placeholder='Nacionalidad' aria-label='Nacionalidad' />
                    <Input onChange={handleChange} name='religion' placeholder='Religion' aria-label='Religion' />
                    <Input onChange={handleChange} name='ocupation' placeholder='Ocupacion' aria-label='Ocupacion' />
                    <Input onChange={handleChange} name='documentId' placeholder='Cedula' aria-label='Cedula' />
                    <Input onChange={handleChange} name='address' placeholder='Direccion' aria-label='Direccion' />
                    <Input onChange={handleChange} name='residentialPhone' placeholder='Telefono residencial' aria-label='Telefono residencial' />
                    <Input onChange={handleChange} name='cellphone' placeholder='Celular' aria-label='Celular' />
                </div>

            </div>
            <div className={styles.emergencyContact}>
                <h1 className='text-xl'>Contacto de emergencia</h1>
                <div className={styles.inputs}>
                    <Input onChange={handleChange} name='emergencyContactName' placeholder='Nombre' aria-label='Nombre' />
                    <Input onChange={handleChange} name='emergencyContactResidentialPhone' placeholder='Telefono residencial' aria-label='Telefono residencial' />
                    <Input onChange={handleChange} name='emergencyContactCellphone' placeholder='Celular' aria-label='Celular' />
                    <Input onChange={handleChange} name='emergencyContactRelationship' placeholder='Parentesco' aria-label='Parentesco' />
                    <Input onChange={handleChange} name='emergencyContactAddress' placeholder='Direccion' aria-label='Direccion' />
                </div>
            </div>
            <div className={styles.ARS}>
                <h1 className='text-xl'>ARS</h1>
                <div className='flex gap-4'>
                    <label>¿Tiene ARS?</label>
                    <div className='flex items-center gap-2'>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="yes" name="hasAssurance" value={true} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={formData.hasAssurance} aria-label='Si' />
                        <label htmlFor="yes">Si</label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="no" name="hasAssurance" value={false} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={!formData.hasAssurance} aria-label='No' />
                        <label htmlFor="no">No</label>
                    </div>
                </div>
                <div className={styles.inputs} style={{ display: showARS ? 'grid' : 'none' }}>
                    <Input onChange={handleChange} name='ARSName' placeholder='Nombre' aria-label='Nombre' />
                    <Input onChange={handleChange} name='ARSCardholder' placeholder='Titular' aria-label='Titular' />
                    <Input onChange={handleChange} name='ARSPrimaryInsured' placeholder='Asegurado principal' aria-label='Asegurado principal' />
                    <Input onChange={handleChange} name='ARSPlan' placeholder='Plan' aria-label='Plan' />
                    <Input onChange={handleChange} name='ARSContractNumber' placeholder='Numero de contrato' aria-label='Numero de contrato' />
                    <Select className='border border-[#ccc]' value={formData.ARSPrimaryInsuredRelationship} onChange={(e) => setFormData({ ...formData, ARSPrimaryInsuredRelationship: e.target.value as PrimaryInsuredRelationship })} placeholder='Parentesco' aria-label='Parentesco'>
                        {primaryInsuredRelationships.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Button onClick={e => e.preventDefault()} className='bg-[#0070f3] text-white h-12'>Enviar</Button>
        </form>
    )
}