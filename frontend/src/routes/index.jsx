import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Dashboard from '../pages/Dashboard';

import Reservas from '../pages/Reservas';

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    }
                />

                <Route
                    path="/reservas"
                    element={
                        <MainLayout>
                            <Reservas />
                        </MainLayout>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;
