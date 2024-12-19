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
                    <td>${tarea.realizada ? "<input type='checkbox' checked>":"<td><input type='checkbox'></td>"}</td>
                    <td><button onClick="eliminarTareas(${tarea.id})" class="btn btn-danger">Eliminar</button></td>
                </tr>
        `;
        contenidoHTML+=tareaHTML
    });
    contenedor.innerHTML = contenidoHTML
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
    }
}
function eliminarTareas(id){
    const index = listaTareas.findIndex( tarea => tarea.id == id)
    if(index !== -1){
        listaTareas.splice(index,1)
        renderizarTareas(listaTareas,"tablaBody")
    }

}

window.onload = () => {
    renderizarTareas(listaTareas,"tablaBody")

    const btnAgregar = document.getElementById("btn-agregar")
    btnAgregar.addEventListener("click",agregarTareas)
}