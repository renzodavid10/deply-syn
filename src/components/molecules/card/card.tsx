import { ReactNode } from "react";
import { Movimientos } from "../../movimientos";
import { DivFlex } from "../../atoms/flex/flex";


interface CardProps {
    /*type: string,
    numero: string,
    children: ReactNode,
    actualizacion?:string,
    monto: string*/

    children: ReactNode,
    items?: Movimientos[];
    visibleCount?:number;
    actualizacion?:string,
    type?: string,
    cuenta?:string,
    monto?: string

}
//export const Card = ({ type, numero, children, actualizacion,monto }: CardProps) => {
export const Card = ({ children, items,visibleCount,actualizacion,type,cuenta,monto }: CardProps) => {

    return (

        <div className="max-w-7xl rounded overflow-hidden shadow-lg ring-2 ring-blue-500 m-2">
            <div className="font-bold text-xl mb-2 text-left">{children}</div>
            {items && items.slice(0, visibleCount).map((item, index) => (
            <DivFlex monto={item.monto} numero={item.numero} signo={item.signo} type={item.type} key={index}/>
            ))}
            {type && 
            <DivFlex monto={monto} numero={cuenta}actualizacion={actualizacion} type={type}/>
            }
        </div>

    );
}