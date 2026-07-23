import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";
import { rl } from "../utils/Readline";
import { menuUsuarios } from "./MenuUsuarios";
import { menuProductos } from "./MenuProductos";
import { menuVeterinaria } from "./MenuVeterinaria";

export async function menuPrincipal(usuario: Usuario) {
    if (usuario.rol === Rol.ADMIN) {
        await menuAdmin(usuario);
    } else {
        await menuUsuarioNormal(usuario);
    }
}

async function menuAdmin(usuario: Usuario) {
    let opcion = 4;

    while (true) {
        console.log("| MENU PRINCIPAL |");
        console.log("\n1. Usuarios");
        console.log("2. Productos");
        console.log("3. Veterinaria");
        console.log("4. Salir");

        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 4) {
            break;
        }

        switch (opcion) {
            case 1:
                await menuUsuarios();
                break;

            case 2:
                await menuProductos(usuario);
                break;

            case 3:
                await menuVeterinaria(usuario);
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }

    console.log("Saliendo del programa...");
}

async function menuUsuarioNormal(usuario: Usuario) {
    let opcion = 3;

    while (true) {
        console.log("| MENU PRINCIPAL |");
        console.log("\n1. Productos");
        console.log("2. Veterinaria");
        console.log("3. Salir");

        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 3) {
            break;
        }

        switch (opcion) {
            case 1:
                await menuProductos(usuario);
                break;

            case 2:
                await menuVeterinaria(usuario);
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }

    console.log("Saliendo del programa...");
}