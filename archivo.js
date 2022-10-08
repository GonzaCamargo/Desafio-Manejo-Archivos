const fs = require('fs')

async function crearArchivo(name, obj){
    try {
        await fs.promises.writeFile(`./files/${name}`,obj)
        console.log('Archivo creado o guardado');
    } catch (error) {
        throw new Error
    }
}

function leerArchivoSimple(name){

    const data = fs.readFileSync(`./files/${name}`, 'utf-8');
    return data;

}

async function leerArchivo(){
    try {
        const data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
        console.log(data);
        return data
        
    } catch (error) {
        throw new Error
        
    }
}

module.exports = {
    "leerArchivoSimple": leerArchivoSimple,
    "crearArchivo": crearArchivo,
    "leerArchivo": leerArchivo
}
