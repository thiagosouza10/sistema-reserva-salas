import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import api from '../services/api';

import ReservationsTable from '../components/ReservationsTable';

import CreateReservationModal from '../components/CreateReservationModal';

import EditReservationModal from '../components/EditReservationModal';

function Reservas() {

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

    const [salaFilter, setSalaFilter] = useState('');
    const [responsavelFilter, setResponsavelFilter] = useState('');
    const [salasOptions, setSalasOptions] = useState([]);
    const [responsaveisOptions, setResponsaveisOptions] = useState([]);

    async function fetchReservas() {

        try {

            setLoading(true);

            const params = {};

            if (salaFilter) params.sala = salaFilter;
            if (responsavelFilter) params.responsavel = responsavelFilter;

            const response =
                await api.get('/reservas', { params });

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

    useEffect(() => {
        async function loadOptions() {
            try {
                const response = await api.get('/reservas/options');
                setSalasOptions(response.data.salas || []);
                setResponsaveisOptions(response.data.responsaveis || []);
            } catch (err) {
                console.warn('Erro ao carregar opções', err);
            }
        }

        loadOptions();
    }, []);

    return (

        <div className="space-y-8">

            {/* FILTROS */}

            <div className="flex gap-4 items-center">

                <select
                    value={salaFilter}
                    onChange={(e) => setSalaFilter(e.target.value)}
                    className="
                        flex-1
                        px-4
                        py-3
                        border
                        border-slate-200
                        rounded-2xl
                        outline-none
                        cursor-pointer
                        transition
                        hover:border-slate-300
                        hover:bg-slate-50
                        focus:border-blue-400
                        focus:ring-1
                        focus:ring-blue-200
                    "
                >
                    <option value="">Todas as salas</option>
                    {salasOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <select
                    value={responsavelFilter}
                    onChange={(e) => setResponsavelFilter(e.target.value)}
                    className="
                        flex-1
                        px-4
                        py-3
                        border
                        border-slate-200
                        rounded-2xl
                        outline-none
                        cursor-pointer
                        transition
                        hover:border-slate-300
                        hover:bg-slate-50
                        focus:border-blue-400
                        focus:ring-1
                        focus:ring-blue-200
                    "
                >
                    <option value="">Todos os responsáveis</option>
                    {responsaveisOptions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <button
                        onClick={() => fetchReservas()}
                        className="
                            bg-white
                            border
                            border-slate-200
                            text-slate-700
                            px-4
                            py-2
                            rounded-2xl
                            font-medium
                            cursor-pointer
                            transition
                            hover:bg-slate-50
                        "
                    >
                        Buscar
                    </button>

                    <button
                        onClick={() => { setSalaFilter(''); setResponsavelFilter(''); fetchReservas(); }}
                        className="
                            bg-white
                            border
                            border-slate-200
                            text-slate-700
                            px-4
                            py-2
                            rounded-2xl
                            font-medium
                            cursor-pointer
                            transition
                            hover:bg-slate-50
                        "
                    >
                        Limpar
                    </button>
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

export default Reservas;
