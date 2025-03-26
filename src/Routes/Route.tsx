import { BrowserRouter, Route, Routes } from "react-router";
import LoginForm from "../feature/login/login";
import { RegisterPage } from "../feature/register/registerPage";
import NotFoundPage from "../feature/noFound/nofound";
import App2 from "../App2";
import App from "../App";
import { PublicRouter } from "./PublicRouter";
import { useState } from "react";
import { PrivateRouter } from "./PrivateRouter";

export const AppRouter = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(true)
    return (
       /*  <BrowserRouter> */
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRouter isAuthenticated={isAuthenticated}>
                            <LoginForm />
                        </PublicRouter>}
                />
                <Route
                    path="/register"
                    element={
                        <PublicRouter isAuthenticated={isAuthenticated}>
                            <RegisterPage />
                        </PublicRouter>
                    }
                />
                <Route
                    path="/transferencia"
                    element={
                        <PrivateRouter isAuthenticated={isAuthenticated}>
                            <App2 />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/movimientos"
                    element={
                        <PrivateRouter isAuthenticated={isAuthenticated}>
                            <App />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="*"
                    element={

                        <NotFoundPage />
                    }
                />
            </Routes>
       /*  </BrowserRouter> */
    );
};