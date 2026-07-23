export interface Cita {
    id: number;
    servicioId: number;
    usuarioId: number;
    fecha: string;
    estado: "PENDIENTE" | "CONFIRMADA" | "CANCELADA";
}