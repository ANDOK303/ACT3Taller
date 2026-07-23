import { readFile, writeFile } from "fs/promises";  
import { Usuario } from "../models/Usuario";
 
export class UsuarioRepository {
    // Dar la ruta de doden se almacenara mi archivo JSON
    private ruta = "./src/data/usuarios.json";
 
    // Método para obtener usuarios | mostar datos
    async obtenerUsuarios(): Promise<Usuario[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
 
            return JSON.parse(datos);            
        } catch (error) {
            console.log(error);
            return [];
        }
    }
 
    // Método para guardar usuarios | escribir datos
    async guardarUsuarios(usuario: Usuario[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(usuario, null, 4)
            );
 
        } catch (error) {
            console.log(error);
        }
    }
 
    // Método para actualizar usuarios | actualizar datos
    async actualizarUsuarios(usuario: Usuario): Promise<void> {
        try {
            const usuarios = await this.obtenerUsuarios();
            const usuarioIndex = usuarios.findIndex((u) => u.id === usuario.id);
 
            if (usuarioIndex !== -1) {
                usuarios[usuarioIndex] = usuario;
                await this.guardarUsuarios(usuarios);
            }
        } catch (error) {
            console.log(error);
        }
    }
 
    // Método para eliminar usuarios | eliminar datos
    async eliminarUsuarios(id: number): Promise<void> {
        try {
            const usuarios = await this.obtenerUsuarios();
            const usuariosActualizados = usuarios.filter((u) => u.id !== id);
 
            await this.guardarUsuarios(usuariosActualizados);
        } catch (error) {
            console.log(error);
        }
    }
      // Metodo para buscar usuarios por ID | buscar datos
        async buscarPorId(id: number): Promise<Usuario | undefined> {
            try {
                const usuarios = await this.obtenerUsuarios();
                return usuarios.find((u) => u.id === id);
            } catch (error) {
                console.log(error);
                return undefined;
            }}
      

}