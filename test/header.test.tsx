import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Header } from "../src/components/organisms/header/header";

describe("Header Component", () => {
    it("Debe renderizar el contenido pasado como children", () => {
        render(<Header>Hola Mundo</Header>);

        expect(screen.getByText("Hola Mundo")).toBeInTheDocument();
    });

    it("Debe aplicar la clase CSS correctamente", () => {
        const { container } = render(<Header>Prueba de Clase</Header>);

        expect(container.querySelector("header")).toHaveClass(
            "max-w-7xl mb-8 font-sans text-blue-600 text-xl text-left"
        );
    });
});
