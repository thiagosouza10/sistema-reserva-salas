import { Link, useLocation } from 'react-router-dom';

import {
    LayoutDashboard,
    CalendarDays,
    Building2
} from 'lucide-react';

function MainLayout({ children }) {

    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* SIDEBAR */}

            <aside className="w-72 bg-white border-r border-slate-200 p-6">

                <div className="flex items-center gap-3 mb-10">

                    <div className="bg-slate-900 text-white p-3 rounded-2xl">
                        <Building2 size={24} />
                    </div>

                    <div>
                        <h1 className="font-bold text-xl text-slate-800">
                            ReservaSalas
                        </h1>

                        <p className="text-sm text-slate-400">
                            Gestão corporativa
                        </p>
                    </div>

                </div>

                <nav className="space-y-2">

                    <Link
                        to="/"
                        className={`
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-2xl
                            font-medium
                            transition
                            cursor-pointer
                            ${location.pathname === '/'
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-600 hover:bg-slate-100'
                            }
                        `}
                    >
                        <LayoutDashboard size={20} />

                        Dashboard
                    </Link>

                    <Link
                        to="/reservas"
                        className={`
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-2xl
                            font-medium
                            transition
                            cursor-pointer
                            ${location.pathname === '/reservas'
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-600 hover:bg-slate-100'
                            }
                        `}
                    >
                        <CalendarDays size={20} />

                        Reservas
                    </Link>

                </nav>

            </aside>

            {/* CONTEÚDO */}

            <main className="flex-1 p-8">

                {/* HEADER */}

                <header
                    className="
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        p-6
                        mb-8
                        flex
                        items-center
                        justify-between
                    "
                >

                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            {location.pathname === '/' ? 'Dashboard' : 'Reservas'}
                        </h2>

                        <p className="text-slate-400 mt-1">
                            {location.pathname === '/'
                                ? 'Gerencie reservas de salas'
                                : 'Visualize e gerenie todas as reservas'
                            }
                        </p>
                    </div>

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            bg-slate-900
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                        "
                    >
                        T
                    </div>

                </header>

                {children}

            </main>

        </div>
    );
}

export default MainLayout;