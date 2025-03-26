import "./flex.css"
interface FlexProps {
    type?: string,
    numero?: string,
    actualizacion?:string,
    monto?: string,
    signo?: string
}
export const DivFlex = ({ type, numero, actualizacion,monto,signo}: FlexProps) => {
    return (
        <div className="flex mb-4">
                {/*Mi parte izquierda*/}
                <div className="w-3/4">
                    <div className="px-6 py-4 text-left">
                        <div className="text-gray-500 font-light text-xl">{type}</div>
                        <p className="text-gray-500 text-base">{numero}
                        </p>
                    </div>
                </div>
                {/*Mi parte derecha*/}
                <div className="w-1/4">
                    <div className="px-6 py-4 text-left">
                        <div className={`font-ligth text-xl ${signo=="-"? "text-red-800":"text-green-800"}`}>{signo} {monto}</div>
                        <p className="text-gray-500 text-base">{actualizacion}
                        </p>
                    </div>
                </div>
            </div>
    )
}