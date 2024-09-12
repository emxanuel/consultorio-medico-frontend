import MainForm from "@/features/home/components/MainForm";
import styles from './styles.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold">Registro para consulta</h1>
      <MainForm />
    </div>
  );
}
