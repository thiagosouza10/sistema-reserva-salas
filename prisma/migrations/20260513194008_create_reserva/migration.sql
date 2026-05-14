-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "participantes" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'ATIVA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);
