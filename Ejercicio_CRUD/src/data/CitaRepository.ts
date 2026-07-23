import { readFile, writeFile } from "fs/promises";
import { Cita } from "../models/Cita";

export class CitaRepository {
    private ruta = "./src/data/citas.json";

    async obtenerCitas(): Promise<Cita[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async guardarCitas(citas: Cita[]): Promise<void> {
        try {
            await writeFile(this.ruta, JSON.stringify(citas, null, 4));
        } catch (error) {
            console.log(error);
        }
    }
}