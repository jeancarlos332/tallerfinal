
export const getUsers = async (valorBusqueda) => {

    const url = `https://jsonplaceholder.typicode.com/photos/${valorBusqueda}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const persons = [];
    persons.push(data);

    return persons;
}

