import { ServicioRepository } from "../data/ServicioRepository";
import { Servicio } from "../models/Servicio";

export class ServicioService {
    private repository = new ServicioRepository();

    async listar(): Promise<Servicio[]> {
        return await this.repository.obtenerServicios();
    }

    async agregar(servicio: Servicio): Promise<void> {
        try {
            const servicios = await this.repository.obtenerServicios();
            const existe = servicios.some(s => s.id === servicio.id);

            if (existe) {
                console.log("Ya existe un servicio con ese ID.");
                return;
            }

            servicios.push(servicio);
            await this.repository.guardarServicios(servicios);
            console.log("Servicio creado correctamente.");
        } catch (error) {
            console.log("Error al crear el servicio.");
        }
    }

    async actualizar(servicio: Servicio): Promise<void> {
        try {
            const servicios = await this.repository.obtenerServicios();
            const indice = servicios.findIndex(s => s.id === servicio.id);

            if (indice === -1) {
                console.log("El servicio no existe.");
                return;
            }

            servicios[indice] = servicio;
            await this.repository.guardarServicios(servicios);
            console.log("Servicio actualizado.");
        } catch (error) {
            console.log("Error al actualizar el servicio.");
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const servicios = await this.repository.obtenerServicios();
            const nuevos = servicios.filter(s => s.id !== id);
            await this.repository.guardarServicios(nuevos);
            console.log("Servicio eliminado.");
        } catch (error) {
            console.log("Error al eliminar el servicio.");
        }
    }

    async buscarPorId(id: number): Promise<Servicio | undefined> {
        try {
            const servicios = await this.repository.obtenerServicios();
            return servicios.find(s => s.id === id);
        } catch (error) {
            console.log("Error al buscar el servicio.");
            return undefined;
        }
    }
}