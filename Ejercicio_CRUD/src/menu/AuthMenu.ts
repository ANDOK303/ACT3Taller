import { Usuario } from "../models/Usuario";
import { rl } from "../utils/Readline";
import { login } from "./Login";
import { registrar } from "./Registro";

export async function autenticacion(): Promise<Usuario | undefined> {
    while (true) {
        console.log("| BIENVENIDO |");
        console.log("\n1. Iniciar sesión");
        console.log("2. Registrarse");
        console.log("3. Salir");

        const opcion = Number(await rl.question("Elige una opción: "));

        if (opcion === 3) {
            console.log("saliendo del programa...xd");
            return undefined;
        }

        if (opcion === 1) {
            return await login();
        }

        if (opcion === 2) {
            const usuario = await registrar();

            if (usuario) {
                console.log(`Bienvenido, ${usuario.nombre}. Tu cuenta fue creada correctamente.`);
                return usuario;
            }

            console.log("No se pudo completar el registro. Intenta de nuevo.");
            continue;
        }

        console.log("Opción inválida.");
    }
    
}