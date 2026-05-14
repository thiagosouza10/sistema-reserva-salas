import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import api from '../services/api';

import ReservationsTable from '../components/ReservationsTable';

function Dashboard() {

    const [reservas, setReservas] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    async function fetchReservas() {

        try {

            setLoading(true);

            const response =
                await api.get('/reservas');

            setReservas(response.data);

        } catch (error) {

            console.log(error);

            toast.error(
                'Erro ao carregar reservas'
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        async function loadData() {

            await fetchReservas();

        }

        loadData();

    }, []);

    return (

        <div className="space-y-8">

            {/* CARDS */}

            <div className="grid grid-cols-3 gap-6">

                <div
                    className="
                        bg-white
                        rounded-3xl
                        p-6
                        border
                        border-slate-200
                    "
                >

                    <p className="text-slate-400 text-sm">
                        Total Reservas
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-slate-800
                            mt-3
                        "
                    >
                        {reservas.length}
                    </h2>

                </div>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        p-6
                        border
                        border-slate-200
                    "
                >

                    <p className="text-slate-400 text-sm">
                        Salas Disponíveis
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-slate-800
                            mt-3
                        "
                    >
                        3
                    </h2>

                </div>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        p-6
                        border
                        border-slate-200
                    "
                >

                    <p className="text-slate-400 text-sm">
                        Reservas Hoje
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-slate-800
                            mt-3
                        "
                    >
                        {reservas.length}
                    </h2>

                </div>

            </div>

            {/* TABELA */}

            <ReservationsTable
                reservas={reservas}
                loading={loading}
                readOnly={true}
            />

        </div>

    );

}

export default Dashboard;
