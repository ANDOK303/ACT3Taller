import { CitaRepository } from "../data/CitaRepository";
import { ServicioRepository } from "../data/ServicioRepository";
import { Cita } from "../models/Cita";

export class CitaService {
    private repository = new CitaRepository();
    private servicioRepository = new ServicioRepository();

    async listar(): Promise<Cita[]> {
        return await this.repository.obtenerCitas();
    }

    async listarPorUsuario(usuarioId: number): Promise<Cita[]> {
        const citas = await this.repository.obtenerCitas();
        return citas.filter(c => c.usuarioId === usuarioId);
    }

    async agregar(cita: Cita): Promise<void> {
        try {
            const citas = await this.repository.obtenerCitas();

            const existe = citas.some(c => c.id === cita.id);

            if (existe) {
                console.log("Ya existe una cita con ese ID.");
                return;
            }

            citas.push(cita);
            await this.repository.guardarCitas(citas);
            console.log("Cita creada correctamente.");
        } catch (error) {
            console.log("Error al crear la cita.");
        }
    }

    async agendar(servicioId: number, usuarioId: number, fecha: string): Promise<void> {
        try {
            const servicios = await this.servicioRepository.obtenerServicios();
            const servicio = servicios.find(s => s.id === servicioId);

            if (!servicio) {
                console.log("El servicio no existe.");
                return;
            }

            if (servicio.cuposDisponibles <= 0) {
                console.log("No hay cupos disponibles para este servicio.");
                return;
            }

            const citas = await this.repository.obtenerCitas();
            const nuevoId = citas.length > 0 ? Math.max(...citas.map(c => c.id)) + 1 : 1;

            const nuevaCita: Cita = {
                id: nuevoId,
                servicioId,
                usuarioId,
                fecha,
                estado: "PENDIENTE"
            };

            citas.push(nuevaCita);
            await this.repository.guardarCitas(citas);

            servicio.cuposDisponibles -= 1;

            if (servicio.cuposDisponibles === 0) {
                const restantes = servicios.filter(s => s.id !== servicioId);
                await this.servicioRepository.guardarServicios(restantes);
                console.log("Cita agendada. El servicio se quedó sin cupos y fue eliminado.");
                return;
            }

            await this.servicioRepository.guardarServicios(servicios);
            console.log("Cita agendada correctamente.");
        } catch (error) {
            console.log("Error al agendar la cita.");
        }
    }

    async actualizarEstado(id: number, estado: Cita["estado"]): Promise<void> {
        try {
            const citas = await this.repository.obtenerCitas();
            const indice = citas.findIndex(c => c.id === id);

            if (indice === -1) {
                console.log("La cita no existe.");
                return;
            }

            citas[indice].estado = estado;
            await this.repository.guardarCitas(citas);
            console.log("Cita actualizada.");
        } catch (error) {
            console.log("Error al actualizar la cita.");
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const citas = await this.repository.obtenerCitas();
            const nuevas = citas.filter(c => c.id !== id);
            await this.repository.guardarCitas(nuevas);
            console.log("Cita eliminada.");
        } catch (error) {
            console.log("Error al eliminar la cita.");
        }
    }

    async buscarPorId(id: number): Promise<Cita | undefined> {
        try {
            const citas = await this.repository.obtenerCitas();
            return citas.find(c => c.id === id);
        } catch (error) {
            console.log("Error al buscar la cita.");
            return undefined;
        }
    }
}