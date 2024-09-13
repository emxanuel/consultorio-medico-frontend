import dayjs from 'dayjs';
import styles from './styles.module.css'
import { Button } from '@nextui-org/button';

interface Props {
    firstName: string;
    lastName: string;
    reason: string;
    visit_date: string;
}

const Consultation: React.FC<Props> = ({ firstName, lastName, reason, visit_date }) => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h2 className='text-lg mb-4'><span>{firstName} {lastName}</span> <span>{dayjs(visit_date).toDate().toLocaleDateString()}</span></h2>
                <p> - {reason}</p>

            </div>
            <div className={styles.buttonsContainer}>
                <Button className='bg-white text-green-400 flex items-center border border-green-400 rounded-md duration-300 hover:bg-green-400 hover:text-white gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z" /></svg>
                    Procesar
                </Button>
                <Button className='bg-white text-red-600 flex items-center border border-red-600 rounded-md duration-300 hover:bg-red-600 hover:text-white gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-11.414L9.172 7.757L7.757 9.172L10.586 12l-2.829 2.828l1.415 1.415L12 13.414l2.828 2.829l1.415-1.415L13.414 12l2.829-2.828l-1.415-1.415z" /></svg>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}

export default Consultation;