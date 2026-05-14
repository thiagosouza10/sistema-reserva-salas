import {
    LayoutDashboard,
    CalendarDays,
    Building2
} from 'lucide-react';

function MainLayout({ children }) {
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

                    <button
                        className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              bg-slate-900
              text-white
              font-medium
            "
                    >
                        <LayoutDashboard size={20} />

                        Dashboard
                    </button>

                    <button
                        className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-slate-600
              hover:bg-slate-100
              transition
            "
                    >
                        <CalendarDays size={20} />

                        Reservas
                    </button>

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
                            Dashboard
                        </h2>

                        <p className="text-slate-400 mt-1">
                            Gerencie reservas de salas
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