const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log("servidor iniciado")
});

class Container {
    async getAll() {
        try{
            const contenido = await fs.promises.readFileSync('./productos.txt', "utf-8");
            return JSON.parse(contenido)
        }catch(error){}
    }
    async getById(id){
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id ==id);
        console.log(productoBuscado)
    }
}

const contenedor = new Container();
app.get('/productos', async (req,res) => {
    const productos = new Container();
    const mostrarProductos = await productos.getAll();
    res.send(mostrarProductos)
})

app.get("/productosRandom", (res, req) => {
    const random = Math.floor(Math.random()*6+1)
    res.send(`<p> Producto: ${contenedor.getById(random)}`);
});