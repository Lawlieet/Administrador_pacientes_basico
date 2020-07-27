import React,{Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    
    // Crear el State de Citas
    const [cita, setActaulizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
    // Crear State de Error
    const [error, setActualizarError] = useState(false)
    
    // F se ejecuta cuando el usuario escribe en el input
    const actualizarState = e =>{
        // Actaulizar el stado
        setActaulizarCita({
            //Tomar una copia del state previo
            ...cita,
            // Destructuración name -  value
            [e.target.name] : e.target.value
        })
    }

    // Destructurar Cita para evitar poner cita.mascota, cita.hora...
    const { mascota, propietario, fecha, hora, sintomas} = cita

    // Cuando el usuario envia el formulario
    const submitCita = e => {
        e.preventDefault();

        // Validar formulario
        if(
            mascota.trim() === ''
            || propietario.trim() === ''
            || fecha.trim() === ''
            || hora.trim() === ''
            || sintomas.trim() === ''
        ){
            setActualizarError(true);
            return
        }

        // Eliminar mensaje de error si faltan campos
        setActualizarError(false)

        // Asignar ID
        cita.id = uuidv4();
        // Crear la cita
        crearCita(cita)
        // Reiniciar el formulario
        setActaulizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {
                error ? <p className="alerta-error"> Todos los campos son obligatrorios</p> : null
            }
            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={ actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Del Dueño"
                    onChange={ actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={ actualizarState}
                    value={fecha}
                />
                <label>Hora de Alta</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={ actualizarState}
                    value={hora}                  
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={ actualizarState}
                    value={sintomas}
                >    
                </textarea>
                <button 
                    className="u-full-width button-primary"
                    type="submit"
                >Agregar Cita
                </button>
            </form>

        </Fragment>
    );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
