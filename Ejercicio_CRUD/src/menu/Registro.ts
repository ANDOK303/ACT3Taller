import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";
import { Usuario } from "../models/Usuario";

const service = new UsuarioService();

export async function registrar(): Promise<Usuario | undefined> {
    console.log("| REGISTRO |");

    const nombre = await rl.question("Nombre: ");
    const apellido = await rl.question("Apellido: ");
    const edad = Number(await rl.question("Edad: "));
    const correo = await rl.question("Correo: ");
    const contrasena = Number(await rl.question("Contraseña: "));

    const usuario = await service.registrarUsuario({
        nombre,
        apellido,
        edad,
        correo,
        contrasena
    });

    return usuario;
}