let archivo = require('./archivo.js')

class Contenedor{
    constructor(name){
        this.name = name;
    }

    leerarchivo(){
        const obj = []
        try {
            const tmp = archivo.leerArchivoSimple(this.name);
            if (tmp) {
                const info = JSON.parse(tmp)
                return info;
            }
        } catch (error) {
            throw new Error
        }
        return obj
    }

    save(obj){
        let newId = 0;
        try {
            let info = this.leerarchivo();
            // En caso que se inicie desde 0
            if (info.length != 0) {
                let actualId = info[info.length - 1].id;
                let ultPosicion = info.length - 1;
                info.push(obj);
                newId = actualId + 1;
                // En caso que se elimine un elemento siga el consecutivo
                if (actualId == ultPosicion) {
                    info[newId].id = newId;
                }else{
                    info[ultPosicion+1].id = newId;
                }
                
            }else{
                info.push(obj);
                info[newId].id = newId
            }
            archivo.crearArchivo(this.name,JSON.stringify(info))
        } catch (error) {
            console.log(`error ${error}`);
            throw new Error
        }
        console.log(`Ultimo Id agregado es: ${newId}`);
        return newId
    }

    getById(number){
        const info = this.leerarchivo();
        try {
            let busqueda = info.filter(function(i){
                return i.id == number;
            })
            if (busqueda.length == 0) {
                busqueda = null
            }
            console.log(`Objeto con Id ${number} es: ${JSON.stringify(busqueda)}`);
            return busqueda
        } catch (error) {
            throw new Error
        }
    }

    getAll(){
        console.log(`Todos los archivos son: ${JSON.stringify(this.leerarchivo())}`);
        return this.leerarchivo();
    }

    deleteById(number){
        let obj = this.leerarchivo();
        try {
            let pos = -1;
            // Encontrar el elemento con el ID y tomar el index
            let tmp = obj.find(function(val, i){
                if (val.id == number) {
                    pos = i;
                }
            })
            if (pos == -1) {
                console.log(`El item con Id: ${number} no se encuentra`);
                return null
            }

            obj.splice(pos, 1)
            archivo.crearArchivo(this.name,JSON.stringify(obj))
            console.log(`Elementos resultantes despues de eliminar el Id: ${number} ${JSON.stringify(obj)}`);
        } catch (error) {
            throw new Error
        }
    }

    deleteAll(){
        try {
            archivo.crearArchivo(this.name,'')
        } catch (error) {
            throw new Error
        }
    }
}

let nameArchivo = ('productos.txt');

let newObj = {
    "title": "Papaya",
    "price": 1000,
    "thumbnail": "foto3.png"
};

const c = new Contenedor(nameArchivo);

// c.save(newObj)
// c.getById(0)
// c.getAll()
// c.deleteById(1)
// c.getAll()
// c.deleteAll();