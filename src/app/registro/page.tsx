import MainForm from "@/features/registration/components/MainForm";
import styles from './styles.module.css'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro"
}

export default function RegistrationPage() {
  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold">Registro para consulta</h1>
      <MainForm />
    </div>
  );
}
