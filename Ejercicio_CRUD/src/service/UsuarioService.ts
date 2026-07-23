import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";

export class UsuarioService {
    private repository = new UsuarioRepository();

    // Método para listar
    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuarios();
    }

    // Métdodo para agregar
    async agregar(usuario: Usuario): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const existe = usuarios.some(u => u.id === usuario.id);

            if (existe) {
                console.log("Ya existe un usuario con ese ID.");
                return;
            }

            usuarios.push(usuario);

            await this.repository.guardarUsuarios(usuarios);

            console.log("Usuarios creado correctamente.");
        } catch (error) {
            console.log("Error al crear el usuario.");
        }
    }

    // Método para actualizar
    async actualizar(usuario: Usuario): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const indice = usuarios.findIndex(u => u.id === usuario.id);

            if (indice === -1) {
                console.log("El usuario no existe.");
                return;
            }

            usuarios[indice] = usuario;

            await this.repository.guardarUsuarios(usuarios);

            console.log("Usuario Actualizado.");
        } catch (error) {
            console.log("Error al actualizar el usuario.");
        }
    }

    // Método para eliminar
    async eliminar(id: number): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const nuevos = usuarios.filter(u => u.id !== id);

            if (nuevos.length === usuarios.length) {
                false;
            }

            await this.repository.guardarUsuarios(nuevos);

            console.log("Usuario eliminado.");
        } catch (error) {
            console.log("Error al eliminar.");
        }
    }

    //Método para buscar por ID
    async buscarPorId(id: number): Promise<Usuario | undefined> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();
            return usuarios.find(u => u.id === id);
        } catch (error) {
            console.log("Error al buscar el usuario.");
            return undefined;
        }
    }
     //Metodo para logica de login
    async login(correo: string, contrasena: number): Promise<Usuario | undefined> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();
            return usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
        } catch (error) {
            console.log("Error al iniciar sesión.");
            return undefined;
        }
    }

    // Método para registrar (siempre crea con rol USUARIO)
    async registrarUsuario(datos: Omit<Usuario, "id" | "rol" | "estado">): Promise<Usuario | undefined> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const correoExiste = usuarios.some(u => u.correo === datos.correo);

            if (correoExiste) {
                console.log("Ya existe un usuario con ese correo.");
                return undefined;
            }

            const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

            const nuevoUsuario: Usuario = {
                id: nuevoId,
                ...datos,
                rol: Rol.USUARIO,
                estado: "ACTIVO"
            };

            usuarios.push(nuevoUsuario);
            await this.repository.guardarUsuarios(usuarios);

            console.log("Registro exitoso.");
            return nuevoUsuario;
        } catch (error) {
            console.log("Error al registrar el usuario.");
            return undefined;
        }
    }
}