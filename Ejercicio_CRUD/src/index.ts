import { menuPrincipal } from "./menu/MenuPrincipal";
import { autenticacion } from "./menu/AuthMenu";

async function main() {
    const usuario = await autenticacion();

    if (!usuario) {
        return;
    }

    await menuPrincipal(usuario);
}

main();