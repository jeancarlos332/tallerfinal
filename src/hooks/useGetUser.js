import { useEffect, useState } from 'react'
import { getUsers } from '../helpers/getUsers'

export const useGetUser = (valorBusqueda) => {

    const [estado, setEstado] = useState({
        data: [],
        cargando: true
    })

    useEffect(() => {
        setTimeout(() =>
            getUsers(valorBusqueda)
                .then(data => {
                    setEstado({
                        data: data,
                        cargando: false
                    });
                }), 5)
    }, [valorBusqueda])


    return estado;

}


