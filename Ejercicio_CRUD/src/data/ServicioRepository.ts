import { readFile, writeFile } from "fs/promises";
import { Servicio } from "../models/Servicio";

export class ServicioRepository {
    private ruta = "./src/data/servicios.json";

    async obtenerServicios(): Promise<Servicio[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async guardarServicios(servicios: Servicio[]): Promise<void> {
        try {
            await writeFile(this.ruta, JSON.stringify(servicios, null, 4));
        } catch (error) {
            console.log(error);
        }
    }
}