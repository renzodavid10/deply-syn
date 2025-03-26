import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router"; // Usar BrowserRouter para pruebas de enrutamiento
import NotFoundPage from "../../../src/feature/noFound/nofound";
import "@testing-library/jest-dom";


describe("NotFoundPage", () => {
  it("Debe mostrar el título 404", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("Debe mostrar el texto 'Página no encontrada'", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
  });

  it("Debe tener un enlace para volver al inicio de sesión", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const loginLink = screen.getByText("Volver al inicio de sesión");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("Debe tener un enlace para ir a la página principal", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("Ir a la página principal");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
