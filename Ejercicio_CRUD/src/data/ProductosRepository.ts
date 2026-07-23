import { readFile, writeFile } from "fs/promises";
import { Producto } from "../models/Producto";  

export class ProductosRepository {
    private ruta = "./src/data/productos.json";
    // Método para obtener productos | mostrar datos
    async obtenerProductos(): Promise<Producto[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    // Método para guardar productos | escribir datos
    async guardarProductos(productos: Producto[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(productos, null, 4)
            );
        } catch (error) {
            console.log(error);
        }
    }
    // Método para actualizar productos | actualizar datos
    async actualizarProductos(producto: Producto): Promise<void> {
       try {
            const productos = await this.obtenerProductos();
            const productoIndex = productos.findIndex((p) => p.id === producto.id);
            if (productoIndex !== -1) {
                productos[productoIndex] = producto;
                await this.guardarProductos(productos);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Método para eliminar productos | eliminar datos
    async eliminarProductos(id: number): Promise<void> {
        try {
            const productos = await this.obtenerProductos();
            const productosActualizados = productos.filter((p) => p.id !== id);
            await this.guardarProductos(productosActualizados);
        } catch (error) {
            console.log(error);
        }
    }
    // Metodo para buscar productos por ID | buscar datos
    async buscarPorId(id: number): Promise<Producto | undefined> {
        try {
            const productos = await this.obtenerProductos();
            return productos.find((p) => p.id === id);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    
}
    

