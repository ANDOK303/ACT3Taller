import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";
import { ProductoService } from "../service/ProductoService";
import { rl } from "../utils/Readline";

const service = new ProductoService();

export async function menuProductos(usuario: Usuario) {
    if (usuario.rol === Rol.ADMIN) {
        await menuAdmin();
    } else {
        await menuUsuario();
    }
}

async function menuAdmin() {
    let opcion = 6;

    while (true) {
        console.log("| MENU PRODUCTOS (ADMIN) |");
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
                const stock = Number(await rl.question("Stock: "));

                await service.agregar({ id, nombre, descripcion, precio, stock });
                break;

            case 2:
                console.table(await service.listar());
                break;

            case 3:
                const idActualizar = Number(await rl.question("ID del producto a actualizar: "));
                const nombreActualizar = await rl.question("Nuevo nombre: ");
                const descripcionActualizar = await rl.question("Nueva descripción: ");
                const precioActualizar = Number(await rl.question("Nuevo precio: "));
                const stockActualizar = Number(await rl.question("Nuevo stock: "));

                await service.actualizar({
                    id: idActualizar,
                    nombre: nombreActualizar,
                    descripcion: descripcionActualizar,
                    precio: precioActualizar,
                    stock: stockActualizar
                });
                break;

            case 4:
                const idEliminar = Number(await rl.question("ID del producto a eliminar: "));
                await service.eliminar(idEliminar);
                break;

            case 5:
                const buscarId = Number(await rl.question("ID del producto a buscar: "));
                const productoEncontrado = await service.buscarPorId(buscarId);
                console.table(productoEncontrado);
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}

async function menuUsuario() {
    let opcion = 3;

    while (true) {
        console.log("| MENU PRODUCTOS |");
        console.log("\n1. Listar productos");
        console.log("2. Comprar producto");
        console.log("3. Volver");

        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 3) {
            break;
        }

        switch (opcion) {
            case 1:
                console.table(await service.listar());
                break;

            case 2:
                const id = Number(await rl.question("ID del producto a comprar: "));
                const cantidad = Number(await rl.question("Cantidad: "));
                await service.comprar(id, cantidad);
                break;

            default:
                console.log("Opción inválida. Por favor, elige una opción válida.");
                break;
        }
    }
}