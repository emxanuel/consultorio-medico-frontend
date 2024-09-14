'use client'

import dayjs from 'dayjs';
import styles from './styles.module.css'
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import ModalAnswer from '../ModalAnswer';

interface Props {
    firstName: string;
    lastName: string;
    reason: string;
    visit_date: string;
    id: number;
    status: number,
    diagnosis: string
}

const Consultation: React.FC<Props> = ({ firstName, lastName, reason, visit_date, id, status, diagnosis }) => {
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState<'processed' | 'canceled'>('processed')

    const handleProcessClick = () => {
        setAction('processed')
        setShowModal(true)
    }

    const handleCancelClick = () => {
        setAction('canceled')
        setShowModal(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h2 className='text-lg mb-4'><span>{firstName} {lastName}</span> <span>{dayjs(visit_date).toDate().toLocaleDateString()}</span></h2>
                <p> - {reason}</p>
                {status === 1 && <p className='text-green-400'>Diagnóstico: {diagnosis}</p>}
                {status === 2 && <p className='text-red-600'>Motivo: {diagnosis}</p>}
            </div>
            <div className={styles.buttonsContainer}>
                {status === 0 && (
                    <>
                        <Button className='bg-white text-green-400 flex items-center border border-green-400 rounded-md duration-300 hover:bg-green-400 hover:text-white gap-2' onClick={handleProcessClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z" /></svg>
                            Procesar
                        </Button>
                        <Button className='bg-white text-red-600 flex items-center border border-red-600 rounded-md duration-300 hover:bg-red-600 hover:text-white gap-2' onClick={handleCancelClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-11.414L9.172 7.757L7.757 9.172L10.586 12l-2.829 2.828l1.415 1.415L12 13.414l2.828 2.829l1.415-1.415L13.414 12l2.829-2.828l-1.415-1.415z" /></svg>
                            Cancelar
                        </Button>
                    </>
                )}
            </div>
            {showModal && <ModalAnswer action={action} visitId={id} setShowModal={setShowModal} />}
        </div>
    )
}

export default Consultation;