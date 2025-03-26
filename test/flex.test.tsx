import { describe, expect, it } from 'vitest';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { DivFlex } from '../src/components/atoms/flex/flex';

describe("DivFlex Component", () => {
    it("debe renderizar correctamente con los valores dados", () => {
      render(<DivFlex type="Venta" numero="12345" actualizacion="Hoy" monto="1000" signo="+" />);
      
      expect(screen.getByText("Venta")).toBeInTheDocument();
      expect(screen.getByText("12345")).toBeInTheDocument();
      expect(screen.getByText("Hoy")).toBeInTheDocument();
      expect(screen.getByText("+ 1000")).toBeInTheDocument();
    });
  
    it("debe aplicar color rojo cuando el signo es '-'", () => {
      render(<DivFlex type="Compra" monto="500" signo="-" />);
      
      const montoElement = screen.getByText("- 500");
      expect(montoElement).toHaveClass("text-red-800"); // Verifica que tenga la clase correcta
    });
  
    it("debe aplicar color verde cuando el signo es '+'", () => {
      render(<DivFlex type="Ingreso" monto="200" signo="+" />);
      
      const montoElement = screen.getByText("+ 200");
      expect(montoElement).toHaveClass("text-green-800"); // Verifica que tenga la clase correcta
    });
  });