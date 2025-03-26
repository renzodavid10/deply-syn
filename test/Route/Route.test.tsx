import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { MemoryRouter } from 'react-router';
import { AppRouter } from "../../src/Routes/Route";
import "@testing-library/jest-dom";
import React, { useState } from "react";

// Mock de React

vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
        ...actual,
        useState: vi.fn().mockReturnValue([false, vi.fn()]),
    };
});

/*vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
        ...actual,
        useState: vi.fn(), // Se inicializa el mock sin valores
    };
});*/

/*beforeEach(() => {
    vi.clearAllMocks(); // 🔹 Limpia los mocks antes de cada test
});*/

describe("AppRouter", () => {

    it("Debe mostrar la página de login en la ruta /login", async () => {


        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AppRouter />
            </MemoryRouter>
        );

        await waitFor(() => {
            //screen.debug();
            expect(
                screen.getByRole("heading", { name: /Iniciar Sesión/i })
            ).toBeInTheDocument();

            // Busca el botón "Iniciar Sesión"
            expect(
                screen.getByRole("button", { name: /Iniciar Sesión/i })
            ).toBeInTheDocument();

        });
    });

    it("Debe mostrar la página de registro en la ruta /register", async () => {

        render(
            <MemoryRouter initialEntries={["/register"]}>
                <AppRouter />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: /Registro de usuario/i })
            ).toBeInTheDocument();

            // Busca el botón "Iniciar Sesión"
            expect(
                screen.getByRole("button", { name: /Registrarse/i })
            ).toBeInTheDocument();
        });
    });

    /*it("Debe redirigir a login si intenta acceder a /transferencia sin autenticación", async () => {

        render(
            <MemoryRouter initialEntries={["/transferencia"]}>
                <AppRouter />
            </MemoryRouter>
        );

        await waitFor(() => {
            const headings = screen.getAllByRole("heading", { level: 1 });
            const transferHeading = headings.find((h) => h.textContent?.includes("Nueva Transferencia"));
            expect(transferHeading).toBeInTheDocument();

            expect(
                screen.getByRole("heading", { name: /Nueva Transferencia/i })
            ).toBeInTheDocument();

            // Busca el botón "Iniciar Sesión"
            expect(
                screen.getByRole("button", { name: /Realizar Transferencia/i })
            ).toBeInTheDocument();
        });
    });

    /* it("Debe mostrar la página de movimientos si está autenticado", () => {
         render(
             <MemoryRouter initialEntries={["/movimientos"]}>
                 <AppRouter />
             </MemoryRouter>
         );
 
         expect(screen.getByText(/movimientos/i)).toBeInTheDocument(); // Ajusta según el texto en `App`
     });
 
     it("Debe mostrar la página 404 para rutas desconocidas", () => {
         render(
             <MemoryRouter initialEntries={["/ruta-desconocida"]}>
                 <AppRouter />
             </MemoryRouter>
         );
 
         expect(screen.getByText(/página no encontrada/i)).toBeInTheDocument(); // Ajusta según el texto en `NotFoundPage`
     });*/
});
