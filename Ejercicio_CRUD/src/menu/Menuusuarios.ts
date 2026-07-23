import { Estado } from "../models/Estado";
import { Rol } from "../models/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";

const service = new UsuarioService();

export async function menuUsuarios() {
    let opcion = 6;

    while (true) {
        console.log("| MENU USUARIOS |");
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
                const apellido = await rl.question("Apellido: ");
                const edad = Number(await rl.question("Edad: "));
                const correo = await rl.question("Correo: ");
                const contrasena = Number(await rl.question("Contraseña: "));
                const rolTexto = await rl.question("Rol: ");
                const estadoTexto = await rl.question("Estado: ");

                await service.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contrasena,
                    rol: rolTexto.toUpperCase() as Rol,
                    estado: estadoTexto.toUpperCase() as Estado
                });
                break;

            case 2:
                console.table(await service.listar());
                break;

            case 3:
                const idActualizar = Number(await rl.question("ID del usuario a actualizar: "));
                const nombreActualizar = await rl.question("Nuevo nombre: ");
                const apellidoActualizar = await rl.question("Nuevo apellido: ");
                const edadActualizar = Number(await rl.question("Nueva edad: "));
                const correoActualizar = await rl.question("Nuevo correo: ");
                const contrasenaActualizar = Number(await rl.question("Nueva contraseña: "));
                const rolTextoActualizar = await rl.question("Nuevo rol: ");
                const estadoTextoActualizar = await rl.question("Nuevo estado: ");

                await service.actualizar({
                    id: idActualizar,
                    nombre: nombreActualizar,
                    apellido: apellidoActualizar,
                    edad: edadActualizar,
                    correo: correoActualizar,
                    contrasena: contrasenaActualizar,
                    rol: rolTextoActualizar.toUpperCase() as Rol,
                    estado: estadoTextoActualizar.toUpperCase() as Estado
                });
                break;

            case 4:
                const idEliminar = Number(await rl.question("ID del usuario a eliminar: "));
                await service.eliminar(idEliminar);
                break;

            case 5:
                const buscarId = Number(await rl.question("ID del usuario a buscar: "));
                console.table(await service.buscarPorId(buscarId));
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}