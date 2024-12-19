const listaTareas = [
    { id: 1, descripcion: "Hacer la cama", realizada: false },
    { id: 2, descripcion: "Lavarse los dientes", realizada: false },
    { id: 3, descripcion: "Tomar desayuno", realizada: false },
];

function renderizarTareas (listaTareas, contenedorId){
    const contenedor = document.getElementById(contenedorId)
    let contenidoHTML = "";
    listaTareas.forEach(tarea => {
        let tareaHTML = `
                <tr>
                    <td>${tarea.id}</td>
                    <td>${tarea.descripcion}</td>
                    <td>
                        ${tarea.realizada 
                        ? `<input type='checkbox' checked onchange='cambiarEstadoRealizado(${tarea.id})'>` 
                        : `<input type='checkbox' onchange='cambiarEstadoRealizado(${tarea.id})'>`}
                    </td>
                    <td><button onClick="eliminarTareas(${tarea.id})" class="btn btn-danger">Eliminar</button></td>
                </tr>
        `;
        contenidoHTML+=tareaHTML
    });
    contenedor.innerHTML = contenidoHTML
    actualizarResumen()
}
function agregarTareas(){
    const tareaInput = document.getElementById("agregar-tarea")
    const descripcionNuevatarea=tareaInput.value.trim()
    if (descripcionNuevatarea){
        const nuevaTarea ={
            id: Date.now(),
            descripcion: descripcionNuevatarea,
            realizada: false
        }
        listaTareas.push(nuevaTarea)
        renderizarTareas(listaTareas,"tablaBody")
        tareaInput.value = "";
    }
}
function eliminarTareas(id){
    const index = listaTareas.findIndex( tarea => tarea.id == id)
    if(index !== -1){
        listaTareas.splice(index,1)
        renderizarTareas(listaTareas,"tablaBody")
    }
}
function cambiarEstadoRealizado(id){
    const tarea = listaTareas.filter(tarea => tarea.id === id)
    if (tarea){
        tarea[0].realizada = !tarea[0].realizada
        renderizarTareas(listaTareas,"tablaBody")
    }
}
function actualizarResumen(){
    const totalTareas = listaTareas.length;
    const tareasRealizadas = listaTareas.filter (tarea => tarea.realizada).length

    document.getElementById("total-tareas").innerText = totalTareas
    document.getElementById("tareas-realizadas").innerText = tareasRealizadas
}

window.onload = () => {
    renderizarTareas(listaTareas,"tablaBody")
    const btnAgregar = document.getElementById("btn-agregar")
    btnAgregar.addEventListener("click",agregarTareas)
}