import { firebase } from '../firebase'

export const obtenerDatos = async () => {
    const users = [];

    try {
        const db = firebase.firestore()
        const data = await db.collection('users').get()
        const arrayData = data.docs.map(item => (
            {
                id: item.id, ...item.data()
            }
        ))
        console.log(arrayData);
    return arrayData;
    } catch (error) {
    }

    

}