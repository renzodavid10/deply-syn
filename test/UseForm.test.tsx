
import { describe, expect, it, } from 'vitest';
import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useForm } from '../src/components/hooks/UseForm';
import { act, ChangeEvent } from 'react';


describe("useForm Hook", () => {
    const initialValues = {
        email: "",
        password: "",
    };

    it("Debe retornar los valores iniciales correctamente", () => {
        const { result } = renderHook(() => useForm(initialValues));
        expect(result.current.form).toEqual(initialValues);
    });

    it("Debe actualizar el estado al llamar a hadleChange", () => {
        const { result } = renderHook(() => useForm(initialValues));

        act(() => {
            result.current.hadleChange({
                target: { name: "email", value: "test@example.com" },
            } as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.form.email).toBe("test@example.com");
    });

    it("Debe resetear el formulario al llamar a onResetForm", () => {
        const { result } = renderHook(() => useForm(initialValues));

        act(() => {
            result.current.hadleChange({
                target: { name: "email", value: "test@example.com" },
            } as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.form.email).toBe("test@example.com");

        act(() => {
            result.current.onResetForm();
        });

        expect(result.current.form).toEqual(initialValues);
    });
});
