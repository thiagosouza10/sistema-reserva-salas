import {
    Pencil,
    Trash2
} from 'lucide-react';

function ReservationsTable({
    reservas,
    loading,
    onEdit,
    onDelete
}) {

    if (loading) {

        return (

            <div
                className="
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    p-10
                    text-center
                "
            >

                <p className="text-slate-400">
                    Carregando reservas...
                </p>

            </div>

        );

    }

    return (

        <div
            className="
                bg-white
                rounded-3xl
                border
                border-slate-200
                overflow-hidden
            "
        >

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th
                            className="
                                text-left
                                p-5
                                text-slate-500
                            "
                        >
                            Sala
                        </th>

                        <th
                            className="
                                text-left
                                p-5
                                text-slate-500
                            "
                        >
                            Responsável
                        </th>

                        <th
                            className="
                                text-left
                                p-5
                                text-slate-500
                            "
                        >
                            Data
                        </th>

                        <th
                            className="
                                text-left
                                p-5
                                text-slate-500
                            "
                        >
                            Horário
                        </th>

                        <th
                            className="
                                text-left
                                p-5
                                text-slate-500
                            "
                        >
                            Status
                        </th>

                        <th
                            className="
                                text-left
                                p-5
                                text-slate-500
                            "
                        >
                            Ações
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        reservas.length === 0 && (
                            <tr>

                                <td
                                    colSpan="6"
                                    className="
                                        text-center
                                        py-10
                                        text-slate-400
                                    "
                                >
                                    Nenhuma reserva encontrada
                                </td>

                            </tr>
                        )
                    }

                    {reservas.map((reserva) => (

                        <tr
                            key={reserva.id}
                            className="
                                border-t
                                border-slate-100
                                hover:bg-slate-50
                                transition
                            "
                        >

                            <td
                                className="
                                    p-5
                                    font-medium
                                    text-slate-700
                                "
                            >
                                {reserva.sala}
                            </td>

                            <td
                                className="
                                    p-5
                                    text-slate-600
                                "
                            >
                                {reserva.responsavel}
                            </td>

                            <td
                                className="
                                    p-5
                                    text-slate-600
                                "
                            >
                                {reserva.data}
                            </td>

                            <td
                                className="
                                    p-5
                                    text-slate-600
                                "
                            >
                                {reserva.horaInicio}
                                {' '}às{' '}
                                {reserva.horaFim}
                            </td>

                            <td className="p-5">

                                <span
                                    className="
                                        bg-emerald-100
                                        text-emerald-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                    "
                                >
                                    {reserva.status}
                                </span>

                            </td>

                            <td className="p-5">

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            onEdit(reserva)
                                        }
                                        className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-slate-900
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            cursor-pointer
                                            transition
                                            hover:opacity-90
                                            hover:shadow-md
                                            hover:-translate-y-0.5
                                        "
                                    >

                                        <Pencil size={18} />

                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(
                                                reserva.id
                                            )
                                        }
                                        className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-red-500
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            cursor-pointer
                                            transition
                                            hover:opacity-90
                                            hover:shadow-md
                                            hover:-translate-y-0.5
                                        "
                                    >

                                        <Trash2 size={18} />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ReservationsTable;