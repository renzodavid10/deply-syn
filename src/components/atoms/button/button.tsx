import { ReactNode } from "react";
import "./button.css"

interface ButtonProps {
    children: ReactNode;
    onClick?:() => void;
}
export const Button = ({ children,onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className="w-96 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {children}
        </button>
    )
}