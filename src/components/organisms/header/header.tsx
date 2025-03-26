import { ReactNode } from "react";
import "./header.css";

interface HeaderProps{
    children: ReactNode
}
export const Header= ({children}:HeaderProps)=>{
    return(
    
       <header className="max-w-7xl
 mb-8 font-sans text-blue-600 text-xl text-left">{children}</header>

    );
}