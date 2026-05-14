import toast from 'react-hot-toast';
import { useState } from 'react';

import api from '../services/api';

function EditReservationModal({
    open,
    onClose,
    onUpdated,
    reserva
}) {

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] =
        useState(() => ({
            sala: reserva?.sala || '',
            responsavel:
                reserva?.responsavel || '',
            data: reserva?.data || '',
            horaInicio:
                reserva?.horaInicio || '',
            horaFim:
                reserva?.horaFim || ''
        }));

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);

            await api.put(
                `/reservas/${reserva.id}`,
                formData
            );

            toast.success(
                'Reserva atualizada!'
            );

            onUpdated();

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                'Erro ao atualizar'
            );

        } finally {

            setSaving(false);

        }

    }

    if (!open) return null;

    return (

        <div
            onClick={onClose}
            className="
                fixed
                inset-0
                bg-black/40
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="
                    bg-white
                    w-full
                    max-w-2xl
                    rounded-3xl
                    p-8
                "
            >

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        mb-8
                    "
                >

                    <div>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                text-slate-800
                            "
                        >
                            Editar Reserva
                        </h2>

                        <p className="text-slate-400 mt-1">
                            Atualize os dados
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="
                            text-slate-400
                            cursor-pointer
                            transition
                            hover:text-slate-700
                            hover:scale-110
                        "
                    >
                        ✕
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="text-sm text-slate-500">
                                Sala
                            </label>

                            <select
                                name="sala"
                                value={formData.sala}
                                onChange={handleChange}
                                className="
                                    w-full
                                    mt-2
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    px-4
                                    py-3
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
                                <option>
                                    Brasil
                                </option>

                                <option>
                                    Portugal
                                </option>

                                <option>
                                    Espanha
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="text-sm text-slate-500">
                                Responsável
                            </label>

                            <select
                                name="responsavel"
                                value={
                                    formData.responsavel
                                }
                                onChange={handleChange}
                                className="
                                    w-full
                                    mt-2
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    px-4
                                    py-3
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
                                <option>
                                    Thiago
                                </option>

                                <option>
                                    Helena
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        <div>

                            <label className="text-sm text-slate-500">
                                Data
                            </label>

                            <input
                                type="date"
                                name="data"
                                value={formData.data}
                                onChange={handleChange}
                                className="
                                    w-full
                                    mt-2
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    px-4
                                    py-3
                                    outline-none
                                    cursor-pointer
                                    transition
                                    hover:border-slate-300
                                    hover:bg-slate-50
                                    focus:border-blue-400
                                    focus:ring-1
                                    focus:ring-blue-200
                                "
                            />

                        </div>

                        <div>

                            <label className="text-sm text-slate-500">
                                Hora início
                            </label>

                            <input
                                type="time"
                                name="horaInicio"
                                value={
                                    formData.horaInicio
                                }
                                onChange={handleChange}
                                className="
                                    w-full
                                    mt-2
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    px-4
                                    py-3
                                    outline-none
                                    cursor-pointer
                                    transition
                                    hover:border-slate-300
                                    hover:bg-slate-50
                                    focus:border-blue-400
                                    focus:ring-1
                                    focus:ring-blue-200
                                "
                            />

                        </div>

                        <div>

                            <label className="text-sm text-slate-500">
                                Hora fim
                            </label>

                            <input
                                type="time"
                                name="horaFim"
                                value={
                                    formData.horaFim
                                }
                                onChange={handleChange}
                                className="
                                    w-full
                                    mt-2
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    px-4
                                    py-3
                                    outline-none
                                    cursor-pointer
                                    transition
                                    hover:border-slate-300
                                    hover:bg-slate-50
                                    focus:border-blue-400
                                    focus:ring-1
                                    focus:ring-blue-200
                                "
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            w-full
                            bg-slate-900
                            text-white
                            py-4
                            rounded-2xl
                            font-medium
                            cursor-pointer
                            transition
                            hover:opacity-90
                            hover:shadow-lg
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {
                            saving
                                ? 'Atualizando...'
                                : 'Salvar alterações'
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditReservationModal;