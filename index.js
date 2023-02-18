//Tarea 1, Consulta de API, Programacion Web
//Dueñas Nuñez Alan Gabriel 19211630
//Cuevas Martinez Adrian de Jesus 19211623

//variables y constantes para obtencion y busqueda
var personajes = [];
var busqueda = [];
const contenedorPersonajes = document.querySelector(".personajes");
const barraBusqueda = document.querySelector("#barra-busqueda");

//Primera carga de pagina
window.onload = () => {

    barraBusqueda.value = "";
    obtenerPersonajes();
}

//Event listener para cada ingreso de tecla
barraBusqueda.addEventListener("keyup", async () => {

    if(barraBusqueda.value === "") {
        desplegarPersonajes(personajes);
        return;
    }

    busqueda.length = 0;
    console.log(`Buscando "${barraBusqueda.value}"...`);

    //Busqueda de personaje
    await fetch(`https://swapi.dev/api/people/?search=${barraBusqueda.value}`)
    .then(consulta => consulta.json())
    .then(datos => {
        const {results} = datos;
        busqueda.push(...results);
    });

    desplegarPersonajes(busqueda);
})

//Llamada a API para obtener todos los personajes
async function obtenerPersonajes(){

    console.log("Obteniendo Personajes...");

    for(let i = 1; i < 10; i++) {
        await fetch(`https://swapi.dev/api/people/?page=${i}`)
        .then(pagina => pagina.json())
        .then(datos => {
            const {results} = datos;
            personajes.push(...results);
        });
    }

    desplegarPersonajes(personajes);
}

//Despliegue de personajes dependiendo si hay busqueda o no
function desplegarPersonajes(arreglo) {

    contenedorPersonajes.replaceChildren();

    arreglo.forEach((elemento) => {

        const cuadro = document.createElement("div");
        const nombre = document.createElement("h2");    
        const atributos = document.createElement("ul");
        const nacimiento = document.createElement("li");
        const genero = document.createElement("li");
        const estatura = document.createElement("li");
        const colorOjos = document.createElement("li");

        cuadro.classList.add("personaje");
        nombre.textContent = elemento.name;
        nacimiento.textContent = `BIRTH YEAR: ${elemento.birth_year}`;
        genero.textContent = `GENDER: ${elemento.gender}`;
        estatura.textContent = `HEIGHT: ${elemento.height} cm`;
        colorOjos.textContent = `EYE COLOR: ${elemento.eye_color}`;

        contenedorPersonajes.appendChild(cuadro);
        cuadro.appendChild(nombre);
        cuadro.appendChild(atributos);
        atributos.appendChild(nacimiento);
        atributos.appendChild(genero);
        atributos.appendChild(estatura);
        atributos.appendChild(colorOjos); 
    });

    console.log("Personajes Desplegados");
}