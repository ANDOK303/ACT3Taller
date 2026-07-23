import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";
import { Usuario } from "../models/Usuario";
 
const service = new UsuarioService();
 
export async function login(): Promise<Usuario | undefined> {
    let intentos = 3;
 
    while (intentos > 0) {
        const correo = await rl.question("Correo: ");
        const contrasena = Number(await rl.question("Contraseña: "));
 
        const usuario = await service.login(correo, contrasena);
 
        if (usuario) {
            console.log(`Bienvenido, ${usuario.nombre}.`);
            return usuario;
        }
 
        intentos--;
        console.log(`Te quedan ${intentos} intento(s).`);
    }
 
    console.log("Se acabaron los intentos. Saliendo...");
    return undefined;
}
 