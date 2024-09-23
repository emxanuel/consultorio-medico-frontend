"use client"

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Select } from '@nextui-org/select'
import { SelectItem } from '@nextui-org/select'
import { DatePicker } from '@nextui-org/date-picker'
import { Textarea } from '@nextui-org/react'
// import { Input, Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { FormData } from '@/types'
import { MaritalStatus, PrimaryInsuredRelationship, Gender } from '@/types'
import { getLocalTimeZone, today } from '@internationalized/date'

import styles from './styles.module.css'
import { RadioButton } from 'primereact/radiobutton'
import { createPatient } from '../../actions/createPatient'
import dayjs from 'dayjs'

interface Props {
    data?: FormData,
    readonly?: boolean
}

export default function MainForm({ data, readonly }: Props) {

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
        if (data){
            setFormData(data)
        }
    }, [data])

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
        <form className={`${styles.container} ${readonly && styles.whiteText}`}>
            <div className={styles.personalInformation}>
                <h1 className='text-xl'>Información del paciente</h1>
                <div className={styles.inputs}>
                    <Input onChange={handleChange} name='firstName' label='Nombre del paciente' value={formData.firstName} isDisabled={readonly} />
                    <Input onChange={handleChange} name='lastName' label='Apellido' value={formData.lastName} isDisabled={readonly} />
                    <Input onChange={handleChange} name="age" type='number' max={120} label='Edad' value={formData.age} isDisabled={readonly} />
                    <Select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })} label='Genero' isDisabled={readonly}>
                        {genders.map(g => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                    </Select>
                    <Select value={formData.maritalStatus} onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as MaritalStatus })} label='Estado civil' isDisabled={readonly}>
                        {maritalStatuses.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </Select>
                    {readonly ? (
                        <Input onChange={handleChange} name='birthDate' label='Fecha de nacimiento' value={dayjs(formData.birthDate).toDate().toLocaleDateString()} isDisabled={readonly} />
                    ) : (
                        <DatePicker minValue={today(getLocalTimeZone()).subtract({years: 300})} showMonthAndYearPickers onChange={(e) => setFormData({ ...formData, birthDate: e.toString() })} label='Fecha de nacimiento' />
                    )}
                    <Input onChange={handleChange} name='birthPlace' label='Lugar de nacimiento' value={formData.birthPlace} isDisabled={readonly} />
                    <Input onChange={handleChange} name='nationality' label='Nacionalidad' value={formData.nationality} isDisabled={readonly} />
                    <Input onChange={handleChange} name='religion' label='Religion' value={formData.religion} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ocupation' label='Ocupacion' value={formData.ocupation} isDisabled={readonly} />
                    <Input onChange={handleChange} name='documentId' label='Cedula' value={formData.documentId} isDisabled={readonly} />
                    <Input onChange={handleChange} name='address' label='Direccion' value={formData.address} isDisabled={readonly} />
                    <Input onChange={handleChange} name='residentialPhone' label='Telefono residencial' value={formData.residentialPhone} isDisabled={readonly} />
                    <Input onChange={handleChange} name='cellphone' label='Celular' value={formData.cellphone} isDisabled={readonly} />
                </div>

            </div>
            <div className={styles.emergencyContact}>
                <h1 className='text-xl'>Contacto de emergencia</h1>
                <div className={styles.inputs}>
                    <Input onChange={handleChange} name='emergencyContactName' label='Nombre' value={formData.emergencyContactName} isDisabled={readonly} />
                    <Input onChange={handleChange} name='emergencyContactResidentialPhone' label='Telefono residencial' value={formData.emergencyContactResidentialPhone} isDisabled={readonly} />
                    <Input onChange={handleChange} name='emergencyContactCellphone' label='Celular' value={formData.emergencyContactCellphone} isDisabled={readonly} />
                    <Input onChange={handleChange} name='emergencyContactRelationship' label='Parentesco' value={formData.emergencyContactRelationship} isDisabled={readonly} />
                    <Input onChange={handleChange} name='emergencyContactAddress' label='Direccion' value={formData.emergencyContactAddress} isDisabled={readonly} />
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
                <div className={styles.inputs} style={{ display: readonly ? 'grid' : showARS ? 'grid' : 'none' }}>
                    <Input onChange={handleChange} name='ARSName' label='Nombre' value={formData.ARSName} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSCardholder' label='Titular' value={formData.ARSCardholder} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSPrimaryInsured' label='Asegurado principal' value={formData.ARSPrimaryInsured} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSPlan' label='Plan' value={formData.ARSPlan} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSContractNumber' label='Numero de contrato' value={formData.ARSContractNumber} isDisabled={readonly} />
                    <Select value={formData.ARSPrimaryInsuredRelationship} onChange={(e) => setFormData({ ...formData, ARSPrimaryInsuredRelationship: e.target.value as PrimaryInsuredRelationship })} label='Parentesco' isDisabled={readonly}>
                        {primaryInsuredRelationships.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Textarea isDisabled={readonly} value={formData.reason} onChange={handleChange} name='reason' label='Motivo de la consulta' />
            {loading && <p>Creando paciente...</p>}
            {message && <p>{message}</p>}
            {readonly && <p>Este formulario es solo de lectura</p>}
            {readonly ?? <Button isDisabled={loading} onClick={handleClick} className='bg-[#0070f3] text-white h-12'>Enviar</Button>}
            
        </form>
    )
}