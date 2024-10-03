import QRCode from "react-qr-code"
import { toPng } from "html-to-image"
import { userStore } from "../../store/userStore"
import { useRef } from "react"
import { Button } from "@nextui-org/react"

export default function ModalQR({onclose}: {onclose: () => void}) {
    const { user } = userStore()
    const actualAccount = user.actualAccount

    const QRRef = useRef<never>(null)

    const downloadQR = () => {
        if (!QRRef.current) return
        toPng(QRRef.current).then((dataUrl) => {
            const link = document.createElement('a')
            link.download = `Código QR ${actualAccount.name}.png`
            link.href = dataUrl
            link.click()
        })
    }

    if (!actualAccount) return null

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black flex flex-col items-center justify-center z-20 bg-opacity-80 backdrop-blur-sm" onClick={onclose}>
            <div className="w-[90%] max-w-[20rem] py-16 px-10 rounded-md bg-slate-700 flex flex-col items-center gap-20 shadow-md shadow-white/20" onClick={e => e.stopPropagation()}>
                <QRCode
                    ref={QRRef}
                    value={`${window.location.origin}/${actualAccount.account_key}/registro`}
                    width={256}
                />
                <Button variant="bordered" fullWidth onClick={downloadQR}>Descargar QR</Button>
            </div>
        </div>
    )
}