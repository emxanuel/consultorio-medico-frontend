'use client'

import { useState } from "react"
import ModalQR from "../modal-qr"



export default function Footer() {
    const [showModalQR, setShowModalQR] = useState(false)
    const downloadQR = () => {
        setShowModalQR(true)
    }

    return (
        <footer className="flex justify-center items-center bg-gray-800 text-white p-2 h-40">
            <div>
                <button onClick={downloadQR}>Generar QR página de registro</button>
            </div>
           {showModalQR && <ModalQR onclose={() => setShowModalQR(false)}/>}
        </footer>
    )
}