import { useState } from 'react';

import toast from 'react-hot-toast';

import api from '../services/api';

function CreateReservationModal({
    open,
    onClose,
    onCreated
}) {

    const [formData, setFormData] = useState({
        sala: 'Brasil',
        responsavel: 'Thiago',
        data: '',
        horaInicio: '',
        horaFim: '',
        participantes: []
    });

    const [saving, setSaving] =
        useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);

            await api.post(
                '/reservas',
                formData
            );

            toast.success(
                'Reserva criada com sucesso!'
            );

            setFormData({
                sala: 'Brasil',
                responsavel: 'Thiago',
                data: '',
                horaInicio: '',
                horaFim: '',
                participantes: []
            });

            onCreated();

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                'Erro ao criar reserva'
            );

        } finally {

            setSaving(false);

        }

    }

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

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
                    animate-[fadeIn_.2s_ease]
                    w-full
                    max-w-2xl
                    rounded-3xl
                    p-8
                "
            >

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
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
                            Nova Reserva
                        </h2>

                        <p className="text-slate-400 mt-1">
                            Preencha os dados da reserva
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

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* LINHA 1 */}

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
                                value={formData.responsavel}
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

                    {/* LINHA 2 */}

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
                                value={formData.horaInicio}
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
                                value={formData.horaFim}
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

                    {/* BOTÃO */}

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
                                ? 'Criando reserva...'
                                : 'Criar Reserva'
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateReservationModal;