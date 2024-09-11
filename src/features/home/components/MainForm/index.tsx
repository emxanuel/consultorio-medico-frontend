"use client"

import { ChangeEvent, useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FormData } from '@/types'
import { InputNumber } from 'primereact/inputnumber'
import { MaritalStatus, PrimaryInsuredRelationship, Gender } from '@/types'

import styles from './styles.module.css'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'


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
                    <InputText onChange={handleChange} name='firstName' placeholder='Nombre del paciente' />
                    <InputText onChange={handleChange} name='lastName' placeholder='Apellido' />
                    <InputNumber inputClassName='border border-[#ccc] rounded-md bg-white px-[20px] py-[10px]' className='' placeholder='Edad' max={120} />
                    <div className='flex flex-col'>
                        <label>Genero</label>
                        <Dropdown className='border border-[#ccc]' value={formData.gender} options={genders} onChange={(e) => setFormData({ ...formData, gender: e.value })} optionLabel='Genero' defaultValue='Masculino' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Estado Civil</label>
                        <Dropdown className='border border-[#ccc]' value={formData.maritalStatus} options={maritalStatuses} onChange={(e) => setFormData({ ...formData, maritalStatus: e.value })} optionLabel='Estado civil' />
                    </div>
                    <div className='flex flex-col '>
                        <label>Fecha de nacimiento</label>
                        <input type="date" className='bg-white px-2 rounded-md border border-[#ccc] h-full'/>
                    </div>
                    <InputText onChange={handleChange} name='birthPlace' placeholder='Lugar de nacimiento' />
                    <InputText onChange={handleChange} name='nationality' placeholder='Nacionalidad' />
                    <InputText onChange={handleChange} name='religion' placeholder='Religion' />
                    <InputText onChange={handleChange} name='ocupation' placeholder='Ocupacion' />
                    <InputText onChange={handleChange} name='documentId' placeholder='Cedula' />
                    <InputText onChange={handleChange} name='address' placeholder='Direccion' />
                    <InputText onChange={handleChange} name='residentialPhone' placeholder='Telefono residencial' />
                    <InputText onChange={handleChange} name='cellphone' placeholder='Celular' />
                </div>

            </div>
            <div className={styles.emergencyContact}>
                <h1 className='text-xl'>Contacto de emergencia</h1>
                <div className={styles.inputs}>
                    <InputText onChange={handleChange} name='emergencyContactName' placeholder='Nombre' />
                    <InputText onChange={handleChange} name='emergencyContactResidentialPhone' placeholder='Telefono residencial' />
                    <InputText onChange={handleChange} name='emergencyContactCellphone' placeholder='Celular' />
                    <InputText onChange={handleChange} name='emergencyContactRelationship' placeholder='Parentesco' />
                    <InputText onChange={handleChange} name='emergencyContactAddress' placeholder='Direccion' />
                </div>
            </div>
            <div className={styles.ARS}>
                <h1 className='text-xl'>ARS</h1>
                <div className='flex gap-4'>
                    <label>¿Tiene ARS?</label>
                    <div className='flex items-center gap-2'>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="yes" name="hasAssurance" value={true} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={formData.hasAssurance} />
                        <label htmlFor="yes">Si</label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="no" name="hasAssurance" value={false} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={!formData.hasAssurance} />
                        <label htmlFor="no">No</label>
                    </div>
                </div>
                <div className={styles.inputs} style={{ display: showARS ? 'grid' : 'none' }}>
                    <InputText onChange={handleChange} name='ARSName' placeholder='Nombre' />
                    <InputText onChange={handleChange} name='ARSCardholder' placeholder='Titular' />
                    <InputText onChange={handleChange} name='ARSPrimaryInsured' placeholder='Asegurado principal' />
                    <InputText onChange={handleChange} name='ARSPlan' placeholder='Plan' />
                    <InputText onChange={handleChange} name='ARSContractNumber' placeholder='Numero de contrato' />
                    <div className='flex flex-col'>
                        <label>Parentesco con asegurado principal</label>
                        <Dropdown className='border border-[#ccc]' value={formData.ARSPrimaryInsuredRelationship} options={primaryInsuredRelationships} onChange={(e) => setFormData({ ...formData, ARSPrimaryInsuredRelationship: e.value })} optionLabel='Parentesco del asegurado principal' />
                    </div>
                </div>
            </div>
            <Button label='Enviar' onClick={e => e.preventDefault()} className='bg-[#0070f3] text-white h-12' />
        </form>
    )
}