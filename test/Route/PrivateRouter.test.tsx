
import { describe, expect, it, vi } from 'vitest';
import {  render,  screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router';
import { PrivateRouter } from '../../src/Routes/PrivateRouter';

describe("PrivateRouter", () => {

    it("Debe renderizar los children si el usuario está autenticado", () => {
        const { getByText } = render(
            <MemoryRouter>
                <PrivateRouter isAuthenticated={true}>
                    <div>Contenido protegido</div>
                </PrivateRouter>
            </MemoryRouter>
        );

        expect(getByText("Contenido protegido")).toBeInTheDocument();
    });

    it("Debe redirigir si el usuario no está autenticado", () => {
        render(
            <MemoryRouter>
                <PrivateRouter isAuthenticated={false}>
                    <div>Contenido protegido</div>
                </PrivateRouter>
            </MemoryRouter>
        );
        //screen.debug()
        expect(screen.queryByText("Contenido protegido")).toBeNull();

    });
});
