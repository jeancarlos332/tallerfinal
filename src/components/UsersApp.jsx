import React from 'react'
import { useState } from 'react'
import AgregarBusqueda from './AgregarBusqueda';
import UserContenedor from './UserContenedor';

const UsersApp = ({numeros = ['1']}) => {
    const [numerosBusqueda, setNumerosBusqueda] = useState(numeros);
  return (
    <>
    <div > <h1 className='text-center'>  <b> Aplicación de gestión de usuarios </b> </h1> </div>
    <h3>Busque un usuario escribiendo un número del 1 al 5000 ( cantidad de usuarios existentes.)</h3>


    <AgregarBusqueda setNumerosBusqueda={setNumerosBusqueda}/>
    <hr/>
    <ol>
        {
            numerosBusqueda.map(numeroBusqueda => (
                <UserContenedor
                    key = {numeroBusqueda} 
                    valorBusqueda={numeroBusqueda}
                />
            ))
            
        }
    </ol>


    </>
  )
}

export default UsersApp