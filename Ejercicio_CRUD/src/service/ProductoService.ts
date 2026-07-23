import { ProductosRepository } from "../data/ProductosRepository";
import { Producto } from "../models/Producto";

export class ProductoService {
    private repository = new ProductosRepository();

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }

    async agregar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();

            const existe = productos.some(p => p.id === producto.id);

            if (existe) {
                console.log("Ya existe un producto con ese ID.");
                return;
            }

            productos.push(producto);

            await this.repository.guardarProductos(productos);

            console.log("Producto creado correctamente.");
        } catch (error) {
            console.log("Error al crear el producto.");
        }
    }

    async actualizar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();

            const indice = productos.findIndex(p => p.id === producto.id);

            if (indice === -1) {
                console.log("El producto no existe.");
                return;
            }

            productos[indice] = producto;

            await this.repository.guardarProductos(productos);

            console.log("Producto actualizado.");
        } catch (error) {
            console.log("Error al actualizar el producto.");
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();

            const nuevos = productos.filter(p => p.id !== id);

            await this.repository.guardarProductos(nuevos);

            console.log("Producto eliminado.");
        } catch (error) {
            console.log("Error al eliminar el producto.");
        }
    }

    async buscarPorId(id: number): Promise<Producto | undefined> {
        try {
            const productos = await this.repository.obtenerProductos();
            return productos.find(p => p.id === id);
        } catch (error) {
            console.log("Error al buscar el producto.");
            return undefined;
        }
    }

    async comprar(id: number, cantidad: number): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();
            const producto = productos.find(p => p.id === id);

            if (!producto) {
                console.log("El producto no existe.");
                return;
            }

            if (cantidad <= 0) {
                console.log("La cantidad debe ser mayor a 0.");
                return;
            }

            if (producto.stock < cantidad) {
                console.log("No hay suficiente stock.");
                return;
            }

            producto.stock -= cantidad;

            if (producto.stock === 0) {
                const restantes = productos.filter(p => p.id !== id);
                await this.repository.guardarProductos(restantes);
                console.log("Compra realizada. El producto se agotó y fue eliminado.");
                return;
            }

            await this.repository.guardarProductos(productos);
            console.log("Compra realizada correctamente.");
        } catch (error) {
            console.log("Error al comprar el producto.");
        }
    }
}