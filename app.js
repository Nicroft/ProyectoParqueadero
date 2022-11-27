let listaVehiculos = [];

const objVehiculo = {
    id: '',
    placa: '',
    estado: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const placaInput = document.querySelector('#placa');
const estadoInput = document.querySelector('#estado');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);


//Validar que se ingresen datos en la placa, para asi crear los objetos id, placa, estado del formulario.
function validarFormulario(e) {
    e.preventDefault();

    if (placaInput.value === '' || estadoInput.value === '') {
        alert('Por favor ingrese la placa del vehiculo.');
        return;
    }

    if (editando) {
        editarVehiculo();
        editando = false;
    } else {
        objVehiculo.id = Date.now();
        objVehiculo.placa = placaInput.value;
        objVehiculo.estado = estadoInput.value;
        agregarVehiculo();
    }
}

//añadir el vehiculo al final de la lista, y se llama al limpiarObjeto para evitar que quede duplicado en la lista a la hora de volverlo a mostrar.
function agregarVehiculo() {
    listaVehiculos.push({ ...objVehiculo });
    mostrarVehiculos();
    formulario.reset();
    limpiarObjeto();

}

//para evitar duplicados.
function limpiarObjeto() {
    objVehiculo.id = '';
    objVehiculo.placa = '';
    objVehiculo.estado = '';
}


//Muestra los vehiculos creando las filas((llamado parrafo)) en conjunto a dos botones de eliminar y editar, y la separación.
function mostrarVehiculos() {
    limpiarHTML();
    const divVehiculos = document.querySelector('.div-vehiculos')

    listaVehiculos.forEach(Vehiculo => {
        const { id, placa, estado } = Vehiculo;
//Revisar------
        const parrafo = document.createElement('p');
        parrafo.textContent = `${placa} - ${estado} -`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarVehiculo(Vehiculo);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarVehiculo(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divVehiculos.appendChild(parrafo);
        divVehiculos.appendChild(hr);
    });

}

//trae los datos a editar de nuevo al formulario
function cargarVehiculo(Vehiculo) {

    const { id, placa, estado } = Vehiculo;
    placaInput.value = placa;
    estadoInput.value = estado;

    objVehiculo.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

//.map crea el nuevo elemento para añadirlo al arreglo.
function editarVehiculo() {
    objVehiculo.placa = placaInput.value;
    objVehiculo.estado = estadoInput.value;

    listaVehiculos.map(Vehiculo => {
        if (Vehiculo.id === objVehiculo.id) {
            Vehiculo.id = objVehiculo.id;
            Vehiculo.placa = objVehiculo.placa;
            Vehiculo.estado = objVehiculo.estado;
            }
         })
    limpiarHTML();
    mostrarVehiculos();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

//funcion del boton eliminar para eliminar un registro del arreglo.
function eliminarVehiculo(id) {
    listaVehiculos = listaVehiculos.filter(Vehiculo => Vehiculo.id !== id);
    limpiarHTML();
    mostrarVehiculos();
}

//Evita crear otro parrafo en el array.
function limpiarHTML() {
    const divVehiculos = document.querySelector('.div-vehiculos');
    while (divVehiculos.firstChild) {
        divVehiculos.removeChild(divVehiculos.firstChild);
    }
}
