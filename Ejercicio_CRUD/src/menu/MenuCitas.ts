import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";
import { Cita } from "../models/Cita";
import { CitaService } from "../service/CitaService";
import { rl } from "../utils/Readline";

const service = new CitaService();

export async function menuCitas(usuario: Usuario) {
    if (usuario.rol === Rol.ADMIN) {
        await menuAdmin();
    } else {
        await menuUsuario(usuario);
    }
}

async function menuAdmin() {
    let opcion = 6;

    while (true) {
        console.log("| MENU CITAS (ADMIN) |");
        console.log("\n1. Agregar");
        console.log("2. Listar todas");
        console.log("3. Actualizar estado");
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
                const servicioId = Number(await rl.question("ID del servicio: "));
                const usuarioId = Number(await rl.question("ID del usuario: "));
                const fecha = await rl.question("Fecha (AAAA-MM-DD): ");
                const estadoNuevo = await rl.question("Estado (PENDIENTE/CONFIRMADA/CANCELADA): ");

                await service.agregar({
                    id,
                    servicioId,
                    usuarioId,
                    fecha,
                    estado: estadoNuevo.toUpperCase() as Cita["estado"]
                });
                break;

            case 2:
                console.table(await service.listar());
                break;

            case 3:
                const idEstado = Number(await rl.question("ID de la cita: "));
                const estado = await rl.question("Nuevo estado (PENDIENTE/CONFIRMADA/CANCELADA): ");
                await service.actualizarEstado(idEstado, estado.toUpperCase() as Cita["estado"]);
                break;

            case 4:
                const idEliminar = Number(await rl.question("ID de la cita a eliminar: "));
                await service.eliminar(idEliminar);
                break;

            case 5:
                const buscarId = Number(await rl.question("ID de la cita a buscar: "));
                console.table(await service.buscarPorId(buscarId));
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}

async function menuUsuario(usuario: Usuario) {
    let opcion = 3;

    while (true) {
        console.log("| MENU CITAS |");
        console.log("\n1. Agendar cita");
        console.log("2. Ver mis citas");
        console.log("3. Volver");

        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 3) {
            break;
        }

        switch (opcion) {
            case 1:
                const servicioId = Number(await rl.question("ID del servicio: "));
                const fecha = await rl.question("Fecha (AAAA-MM-DD): ");
                await service.agendar(servicioId, usuario.id, fecha);
                break;

            case 2:
                console.table(await service.listarPorUsuario(usuario.id));
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}