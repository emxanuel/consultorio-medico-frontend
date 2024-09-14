"use client"

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Select } from '@nextui-org/select'
import { SelectItem } from '@nextui-org/select'
import { DateInput } from '@nextui-org/date-input'
import { Textarea } from '@nextui-org/react'
// import { Input, Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { FormData } from '@/types'
import { MaritalStatus, PrimaryInsuredRelationship, Gender } from '@/types'

import styles from './styles.module.css'
import { RadioButton } from 'primereact/radiobutton'
import { createPatient } from '../../actions/createPatient'


export default function MainForm() {

    const [showARS, setShowARS] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const maritalStatuses = Object.values(MaritalStatus).filter((value) => typeof value === 'string')
    const primaryInsuredRelationships = Object.values(PrimaryInsuredRelationship).filter((value) => typeof value === 'string')
    const genders = Object.values(Gender).filter((value) => typeof value === 'string')

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        age: "",
        gender: Gender.male,
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
        ARSPrimaryInsuredRelationship: PrimaryInsuredRelationship.spouse,
        reason: ""
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

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const response = await createPatient(formData)
            console.log(response)
            if (response) {
                setMessage('Paciente creado correctamente')
            }
        }
        catch (error) {
            setMessage('Error al crear consulta')
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <form className={styles.container}>
            <div className={styles.personalInformation}>
                <h1 className='text-xl'>Información del paciente</h1>
                <div className={styles.inputs}>
                    <Input isRequired onChange={handleChange} name='firstName' label='Nombre del paciente' />
                    <Input isRequired onChange={handleChange} name='lastName' label='Apellido' />
                    <Input isRequired onChange={handleChange} name="age" type='number' max={120} label='Edad' />
                    <Select isRequired value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })} label='Genero'>
                        {genders.map(g => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                    </Select>
                    <Select isRequired value={formData.maritalStatus} onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as MaritalStatus })} label='Estado civil'>
                        {maritalStatuses.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </Select>
                    <DateInput isRequired onChange={(e) => setFormData({ ...formData, birthDate: e.toString() })} label='Fecha de nacimiento' />
                    <Input isRequired onChange={handleChange} name='birthPlace' label='Lugar de nacimiento' />
                    <Input isRequired onChange={handleChange} name='nationality' label='Nacionalidad' />
                    <Input onChange={handleChange} name='religion' label='Religion' />
                    <Input onChange={handleChange} name='ocupation' label='Ocupacion' />
                    <Input isRequired onChange={handleChange} name='documentId' label='Cedula' />
                    <Input isRequired onChange={handleChange} name='address' label='Direccion' />
                    <Input onChange={handleChange} name='residentialPhone' label='Telefono residencial' />
                    <Input isRequired onChange={handleChange} name='cellphone' label='Celular' />
                </div>

            </div>
            <div className={styles.emergencyContact}>
                <h1 className='text-xl'>Contacto de emergencia</h1>
                <div className={styles.inputs}>
                    <Input isRequired onChange={handleChange} name='emergencyContactName' label='Nombre' />
                    <Input isRequired onChange={handleChange} name='emergencyContactResidentialPhone' label='Telefono residencial' />
                    <Input isRequired onChange={handleChange} name='emergencyContactCellphone' label='Celular' />
                    <Input isRequired onChange={handleChange} name='emergencyContactRelationship' label='Parentesco' />
                    <Input isRequired onChange={handleChange} name='emergencyContactAddress' label='Direccion' />
                </div>
            </div>
            <div className={styles.ARS}>
                <h1 className='text-xl'>ARS</h1>
                <div className='flex gap-4'>
                    <label>¿Tiene ARS?</label>
                    <div className='flex items-center gap-2'>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="yes" name="hasAssurance" value={true} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={formData.hasAssurance} aria-label='hasAssurance' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="no" name="hasAssurance" value={false} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={!formData.hasAssurance} aria-label='hasAssurance' />
                    </div>
                </div>
                <div className={styles.inputs} style={{ display: showARS ? 'grid' : 'none' }}>
                    <Input isRequired onChange={handleChange} name='ARSName' label='Nombre' />
                    <Input isRequired onChange={handleChange} name='ARSCardholder' label='Titular' />
                    <Input isRequired onChange={handleChange} name='ARSPrimaryInsured' label='Asegurado principal' />
                    <Input isRequired onChange={handleChange} name='ARSPlan' label='Plan' />
                    <Input isRequired onChange={handleChange} name='ARSContractNumber' label='Numero de contrato' />
                    <Select isRequired value={formData.ARSPrimaryInsuredRelationship} onChange={(e) => setFormData({ ...formData, ARSPrimaryInsuredRelationship: e.target.value as PrimaryInsuredRelationship })} label='Parentesco'>
                        {primaryInsuredRelationships.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Textarea onChange={handleChange} name='reason' label='Motivo de la consulta' />
            {loading && <p>Creando paciente...</p>}
            {message && <p>{message}</p>}
            <Button disabled={loading} onClick={handleClick} className='bg-[#0070f3] text-white h-12'>Enviar</Button>
        </form>
    )
}