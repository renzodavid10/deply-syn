import { describe, expect, it, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router';
import { PublicRouter } from '../../src/Routes/PublicRouter';


describe("PublicRouter", () => {
    it("Debe redirigir a /movimientos si el usuario está autenticado", () => {
        render(
            <MemoryRouter>
                <PublicRouter isAuthenticated={true}>
                    <div>Página pública</div>
                </PublicRouter>
            </MemoryRouter>

        );

        // Verifica que el contenido público NO se muestra
        expect(screen.queryByText("Página pública")).not.toBeInTheDocument();
    });

    it("Debe mostrar el contenido si el usuario no está autenticado", () => {
        render(
            <MemoryRouter>
                <PublicRouter isAuthenticated={false}>
                    <div>Página pública</div>
                </PublicRouter>
            </MemoryRouter >

        );
        // Verifica que el contenido público se muestra correctamente
        expect(screen.getByText("Página pública")).toBeInTheDocument();
    });
});
