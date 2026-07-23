import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";
import { ServicioService } from "../service/ServicioService";
import { rl } from "../utils/Readline";

const service = new ServicioService();

export async function menuServicios(usuario: Usuario) {
    if (usuario.rol === Rol.ADMIN) {
        await menuAdmin();
    } else {
        await menuUsuario();
    }
}

async function menuAdmin() {
    let opcion = 6;

    while (true) {
        console.log("| MENU SERVICIOS (ADMIN) |");
        console.log("\n1. Agregar");
        console.log("2. Listar");
        console.log("3. Actualizar");
        console.log("4. Eliminar");
        console.log("5. Buscar por ID");
        console.log("6. Volver");

        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 6) {
            break;
        }

        switch (opcion) {
            case 1:
                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("Nombre: ");
                const descripcion = await rl.question("Descripción: ");
                const precio = Number(await rl.question("Precio: "));
                const cuposDisponibles = Number(await rl.question("Cupos disponibles: "));

                await service.agregar({ id, nombre, descripcion, precio, cuposDisponibles });
                break;

            case 2:
                console.table(await service.listar());
                break;

            case 3:
                const idActualizar = Number(await rl.question("ID del servicio a actualizar: "));
                const nombreActualizar = await rl.question("Nuevo nombre: ");
                const descripcionActualizar = await rl.question("Nueva descripción: ");
                const precioActualizar = Number(await rl.question("Nuevo precio: "));
                const cuposActualizar = Number(await rl.question("Nuevos cupos disponibles: "));

                await service.actualizar({
                    id: idActualizar,
                    nombre: nombreActualizar,
                    descripcion: descripcionActualizar,
                    precio: precioActualizar,
                    cuposDisponibles: cuposActualizar
                });
                break;

            case 4:
                const idEliminar = Number(await rl.question("ID del servicio a eliminar: "));
                await service.eliminar(idEliminar);
                break;

            case 5:
                const buscarId = Number(await rl.question("ID del servicio a buscar: "));
                console.table(await service.buscarPorId(buscarId));
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}

async function menuUsuario() {
    let opcion = 2;

    while (true) {
        console.log("| MENU SERVICIOS |");
        console.log("\n1. Listar servicios");
        console.log("2. Volver");

        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 2) {
            break;
        }

        switch (opcion) {
            case 1:
                console.table(await service.listar());
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}