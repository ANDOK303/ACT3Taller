import { Usuario } from "../models/Usuario";
import { rl } from "../utils/Readline";
import { menuServicios } from "./MenuServicios";
import { menuCitas } from "./MenuCitas";

export async function menuVeterinaria(usuario: Usuario) {
    let opcion = 3;

    while (true) {
        console.log("| MENU VETERINARIA |");
        console.log("\n1. Servicios");
        console.log("2. Citas");
        console.log("3. Volver");

        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 3) {
            break;
        }

        switch (opcion) {
            case 1:
                await menuServicios(usuario);
                break;

            case 2:
                await menuCitas(usuario);
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}   