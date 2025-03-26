import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import LoginForm from '../../../src/feature/login/login';
import { BrowserRouter } from 'react-router';

describe("LoginForm Component", () => {
    const renderWithRouter = () => render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>
    );

    it("renderiza los campos del formulario", () => {
        renderWithRouter();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/recordarme/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    });
    it("muestra mensajes de error si los campos están vacíos", async () => {
        renderWithRouter();

        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(screen.getByText(/el email es obligatorio/i)).toBeInTheDocument();
            expect(screen.getByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
        });
    });

    it("muestra error si el email no es válido", async () => {
        renderWithRouter();

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "correo-no-valido" } });
        fireEvent.blur(screen.getByLabelText(/email/i));  // Desenfocar el campo para activar la validación
        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        //screen.debug(); // Muestra el DOM actual en la terminal

        await waitFor(() => {
            expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
            //screen.debug()

        });
    });


    it("muestra error si la contraseña es demasiado corta", async () => {
        renderWithRouter();

        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "123" } });
        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
        });
    });
    it("permite enviar el formulario si los datos son correctos", async () => {
        renderWithRouter();

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "renzo@correo.com" } });

        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "123567" } });

        /* fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "1234567" } }); */
        fireEvent.click(screen.getByLabelText(/recordarme/i));

        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        await waitFor(() => {

            expect(screen.queryByText(/email inválido/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/la contraseña debe tener al menos 6 caracteres/i)).not.toBeInTheDocument();
        });
    });
});
