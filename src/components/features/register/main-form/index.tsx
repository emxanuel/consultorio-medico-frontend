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
import { createPatient } from '@/actions/features/register/create-patient'
import dayjs from 'dayjs'
import { userStore } from '@/store/user-store'
import { useMutation } from '@tanstack/react-query'
import { useDictionary } from '@/dictionaries/dictionary-provider'

interface Props {
    data?: FormData,
    readonly?: boolean
}

export default function MainForm({ data, readonly }: Props) {

    const dictionary = useDictionary().form_patients_registration

    const [showARS, setShowARS] = useState(false)
    const [message, setMessage] = useState('')
    const { user } = userStore()
    const actualAccount = user.actualAccount
    const createClientMutation = useMutation({
        mutationFn: () => createPatient(formData, actualAccount.account_key)
    })
    

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
        setMessage('')
        createClientMutation.mutate()
    }

    useEffect(() => {
        if (createClientMutation.isSuccess) {
            setMessage('Paciente creado correctamente')
        }
        if (createClientMutation.isError) {
            setMessage('Error al crear consulta')
        }
    }, [createClientMutation.isError, createClientMutation.isSuccess])


    return (
        <form className={`${styles.container} ${readonly && styles.whiteText}`}>
            <div className={styles.personalInformation}>
                <h1 className='text-xl'>{dictionary.subtitle}</h1>
                <div className={styles.inputs}>
                    <Input onChange={handleChange} name='firstName' label={dictionary.form.name} value={formData.firstName} isDisabled={readonly} isRequired />
                    <Input onChange={handleChange} name='lastName' label={dictionary.form.last_name} value={formData.lastName} isDisabled={readonly} isRequired />
                    <Input onChange={handleChange} name="age" type='number' max={120} label={dictionary.form.age} value={formData.age} isDisabled={readonly} isRequired />
                    <Select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })} label={dictionary.form.gender} isDisabled={readonly} isRequired>
                        {genders.map(g => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                    </Select>
                    <Select value={formData.maritalStatus} onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as MaritalStatus })} label={dictionary.form.marital_status} isDisabled={readonly}>
                        {maritalStatuses.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </Select>
                    {readonly ? (
                        <Input onChange={handleChange} name='birthDate' label={dictionary.form.birthdate} value={dayjs(formData.birthDate).toDate().toLocaleDateString()} isDisabled={readonly} isRequired />
                    ) : (
                        <DatePicker minValue={today(getLocalTimeZone()).subtract({years: 300})} showMonthAndYearPickers onChange={(e) => setFormData({ ...formData, birthDate: e.toString() })} label={dictionary.form.birthdate} isRequired />
                    )}
                    <Input onChange={handleChange} name='birthPlace' label={dictionary.form.birth_place} value={formData.birthPlace} isDisabled={readonly} />
                    <Input onChange={handleChange} name='nationality' label={dictionary.form.nationality} value={formData.nationality} isDisabled={readonly} />
                    <Input onChange={handleChange} name='religion' label={dictionary.form.religion} value={formData.religion} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ocupation' label={dictionary.form.occupation} value={formData.ocupation} isDisabled={readonly} isRequired />
                    <Input onChange={handleChange} name='documentId' label={dictionary.form.id} value={formData.documentId} isDisabled={readonly} isRequired />
                    <Input onChange={handleChange} name='address' label={dictionary.form.address} value={formData.address} isDisabled={readonly} />
                    <Input onChange={handleChange} name='residentialPhone' label={dictionary.form.residential_phone} value={formData.residentialPhone} isDisabled={readonly} />
                    <Input onChange={handleChange} name='cellphone' label={dictionary.form.phone} value={formData.cellphone} isDisabled={readonly} isRequired />
                </div>

            </div>
            <div className={styles.emergencyContact}>
                <h1 className='text-xl'>{dictionary.form.emergency_contact.title}</h1>
                <div className={styles.inputs}>
                    <Input isRequired onChange={handleChange} name='emergencyContactName' label={dictionary.form.emergency_contact.name} value={formData.emergencyContactName} isDisabled={readonly} />
                    <Input onChange={handleChange} name='emergencyContactResidentialPhone' label={dictionary.form.emergency_contact.residential_phone} value={formData.emergencyContactResidentialPhone} isDisabled={readonly} />
                    <Input isRequired onChange={handleChange} name='emergencyContactCellphone' label={dictionary.form.emergency_contact.phone} value={formData.emergencyContactCellphone} isDisabled={readonly} />
                    <Input isRequired onChange={handleChange} name='emergencyContactRelationship' label={dictionary.form.emergency_contact.relationship} value={formData.emergencyContactRelationship} isDisabled={readonly} />
                    <Input onChange={handleChange} name='emergencyContactAddress' label={dictionary.form.emergency_contact.address} value={formData.emergencyContactAddress} isDisabled={readonly} />
                </div>
            </div>
            <div className={styles.ARS}>
                <h1 className='text-xl'>{dictionary.form.assurance.title}</h1>
                <div className='flex gap-4'>
                    <label>{dictionary.form.assurance.question}</label>
                    <div className='flex items-center gap-2'>
                        <label>{dictionary.form.assurance.yes}</label>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="yes" name="hasAssurance" value={true} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={formData.hasAssurance} aria-label='hasAssurance' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label>{dictionary.form.assurance.no}</label>
                        <RadioButton className='border border-[#ccc] rounded-full' inputId="no" name="hasAssurance" value={false} onChange={(e) => setFormData({ ...formData, hasAssurance: e.value })} checked={!formData.hasAssurance} aria-label='hasAssurance' />
                    </div>
                </div>
                <div className={styles.inputs} style={{ display: readonly ? 'grid' : showARS ? 'grid' : 'none' }}>
                    <Input onChange={handleChange} name='ARSName' label={dictionary.form.assurance.name} value={formData.ARSName} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSCardholder' label={dictionary.form.assurance.card_holder} value={formData.ARSCardholder} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSPrimaryInsured' label={dictionary.form.assurance.primary_insured} value={formData.ARSPrimaryInsured} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSPlan' label={dictionary.form.assurance.plan} value={formData.ARSPlan} isDisabled={readonly} />
                    <Input onChange={handleChange} name='ARSContractNumber' label={dictionary.form.assurance.contract_number} value={formData.ARSContractNumber} isDisabled={readonly} />
                    <Select value={formData.ARSPrimaryInsuredRelationship} onChange={(e) => setFormData({ ...formData, ARSPrimaryInsuredRelationship: e.target.value as PrimaryInsuredRelationship })} label={dictionary.form.assurance.relationship} isDisabled={readonly}>
                        {primaryInsuredRelationships.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Textarea isDisabled={readonly} value={formData.reason} onChange={handleChange} name='reason' label='Motivo de la consulta' isRequired />
            {createClientMutation.isPending && <p>Creando paciente...</p>}
            {message && <p>{message}</p>}
            {readonly && <p>Este formulario es solo de lectura</p>}
            {readonly ?? <Button isDisabled={createClientMutation.isPending} onClick={handleClick} className='bg-[#0070f3] text-white h-12'>Enviar</Button>}
            
        </form>
    )
}