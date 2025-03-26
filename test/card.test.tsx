import { describe, expect, it } from 'vitest';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from '../src/components/molecules/card/card';

describe("Card Component", () => {
    it("debe renderizar el título correctamente", () => {
        const ejemplo = "Mis Movimientos"
        render(<Card>{ejemplo}</Card>);

        expect(screen.getByText("Mis Movimientos")).toBeInTheDocument();
    });

    it("debe renderizar los elementos de la lista", () => {
        const items = [
            { monto: "100", numero: "123", signo: "+", type: "Ingreso" },
            { monto: "50", numero: "456", signo: "-", type: "Gasto" },
        ];

        render(<Card items={items} visibleCount={2}>Mis Movimientos</Card>);

        expect(screen.getByText("Ingreso")).toBeInTheDocument();
        expect(screen.getByText("+ 100")).toBeInTheDocument();
        expect(screen.getByText("Gasto")).toBeInTheDocument();
        expect(screen.getByText("- 50")).toBeInTheDocument();
    });

    it("debe renderizar solo los primeros `visibleCount` elementos", () => {
        const items = [
            { monto: "100", numero: "123", signo: "+", type: "Ingreso" },
            { monto: "50", numero: "456", signo: "-", type: "Gasto" },
            { monto: "30", numero: "789", signo: "+", type: "Ingreso Extra" },
        ];

        render(<Card items={items} visibleCount={2}>Movimientos</Card>);

        expect(screen.getByText("Ingreso")).toBeInTheDocument();
        expect(screen.getByText("Gasto")).toBeInTheDocument();
        expect(screen.queryByText("Ingreso Extra")).not.toBeInTheDocument(); // No debe aparecer
    });

    it("debe renderizar la sección extra si `type` está definido", () => {
        render(<Card type="Saldo Total" cuenta="98765" monto="500" actualizacion="Hoy">Resumen</Card>);

        expect(screen.getByText("Saldo Total")).toBeInTheDocument();
        expect(screen.getByText("98765")).toBeInTheDocument();
        expect(screen.getByText("Hoy")).toBeInTheDocument();
        expect(screen.getByText("500")).toBeInTheDocument();
    });
});