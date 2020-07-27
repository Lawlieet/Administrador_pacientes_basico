import React,{Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, setGuardarCitas] = useState(citasIniciales)

  // Use Effect para cuando el state cambiao
  useEffect( () =>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas])

  // F toma las citas actuales y agrega la nueva
  const crearCita = cita => {
    setGuardarCitas([
      ...citas,
      cita
    ])
  }

  //F Elimina una cita x Id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setGuardarCitas(nuevasCitas);
  }

  // Mensaje
  const titulo = citas.length === 0 ? 'No hay citas' : "Administra tus citas"

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      
      <div className="container">  
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita ={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map( cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>

      </div>

    </Fragment>
   
  );
}

export default App;
