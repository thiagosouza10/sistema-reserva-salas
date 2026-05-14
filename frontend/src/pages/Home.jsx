import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import api from '../services/api';

import ReservationsTable from '../components/ReservationsTable';

import CreateReservationModal from '../components/CreateReservationModal';

import EditReservationModal from '../components/EditReservationModal';

function Home() {

    const [reservas, setReservas] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const [openEditModal, setOpenEditModal] =
        useState(false);

    const [selectedReserva, setSelectedReserva] =
        useState(null);

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

    function handleEdit(reserva) {

        setSelectedReserva(reserva);

        setOpenEditModal(true);

    }

    async function handleDelete(id) {

        const confirmDelete =
            window.confirm(
                'Deseja excluir esta reserva?'
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/reservas/${id}`
            );

            toast.success(
                'Reserva excluída!'
            );

            fetchReservas();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                'Erro ao excluir reserva'
            );

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

            {/* BOTÃO */}

            <div className="flex justify-end">

                <button
                    onClick={() =>
                        setOpenModal(true)
                    }
                    className="
                        bg-slate-900
                        text-white
                        px-6
                        py-3
                        rounded-2xl
                        font-medium
                        cursor-pointer
                        transition
                        hover:opacity-90
                        hover:shadow-lg
                    "
                >
                    Nova Reserva
                </button>

            </div>

            {/* TABELA */}

            <ReservationsTable
                reservas={reservas}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* MODAL CRIAR */}

            <CreateReservationModal
                open={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
                onCreated={fetchReservas}
            />

            {/* MODAL EDITAR */}

            <EditReservationModal
                open={openEditModal}
                onClose={() =>
                    setOpenEditModal(false)
                }
                onUpdated={fetchReservas}
                reserva={selectedReserva}
            />

        </div>

    );

}

export default Home;