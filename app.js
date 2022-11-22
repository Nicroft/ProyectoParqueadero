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

function validarFormulario(e) {
    e.preventDefault();

    if (placaInput.value === '' || estadoInput.value === '') {
        alert('todos los campos son obligatorios.');
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

function agregarVehiculo() {
    listaVehiculos.push({ ...objVehiculo});
    mostrarVehiculos();
    formulario.reset();
    limpiarObjeto();

}

function limpiarObjeto() {
    objVehiculo.id = '';
    objVehiculo.placa = '';
    objVehiculo.estado = '';
}



function mostrarVehiculos() {
    limpiarHTML();
    const divVehiculos = document.querySelector('.div-vehiculos')

    listaVehiculos.forEach(Vehiculo => {
        const { id, placa, estado } = Vehiculo;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${placa} - ${estado} -`;
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


function cargarVehiculo(Vehiculo) {

    const { id, placa, estado } = Vehiculo;
    placaInput.value = placa;
    estadoInput.value = estado;

    objVehiculo.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

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

function eliminarVehiculo(id) {

    listaVehiculos = listaVehiculos.filter(Vehiculo => Vehiculo.id !== id);

    limpiarHTML();
    mostrarVehiculos();
}


function limpiarHTML() {
    const divVehiculos = document.querySelector('.div-vehiculos');
    while (divVehiculos.firstChild) {
        divVehiculos.removeChild(divVehiculos.firstChild);
    }
}
