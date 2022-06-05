import React from 'react'
import { useGetUser } from '../hooks/useGetUser'
import UserItem from './UserItem';
import { nanoid } from 'nanoid'
import { firebase } from '../firebase'

const UserContenedor = ({ valorBusqueda }) => {

  const { data, cargando } = useGetUser(valorBusqueda);

  const [albumId, setAlbumId] = React.useState(data[0]?.albumId)
  const [thumbnailUrl, setthumbnailUrl] = React.useState(data[0]?.thumbnailUrl)
  const [title, setTitle] = React.useState(data[0]?.title)
  const [url, setUrl] = React.useState(data[0]?.url)
  const [listaUsers, setListaUsers] = React.useState([0])
  const [id, setId] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState(null)

  
  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('users').get()
        const arrayData = data.docs.map(item => (
          {
            id: item.id, ...item.data()
          }
        ))
        setListaUsers(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    setAlbumId(data[0]?.albumId.toString())
    setthumbnailUrl(data[0]?.thumbnailUrl)
    setTitle(data[0]?.title)
    setUrl(data[0]?.url)
    obtenerDatos();
  })


  const guardarUsers = async (e) => {
    e.preventDefault()

    if (!albumId.trim()) {
      setError('albumId es requerido')
      return
    }
    if (!thumbnailUrl.trim()) {
      setError('thumbnailUrl es requerido')
      return
    }
    if (!title.trim()) {
      setError('title es requerido')
      return
    }

    if (!url.trim()) {
      setError('url es requerido')
      return
    }


    try {
      const db = firebase.firestore()
      const nuevoUser = {
        albumId: albumId,
        thumbnailUrl: thumbnailUrl,
        title: title,
        url: url,
      }

      await db.collection('users').add(nuevoUser)

      setListaUsers([
        ...listaUsers,
        {
          id: nanoid(),
          albumId: albumId,
          thumbnailUrl: thumbnailUrl,
          title: title,
          url: url,
        }
      ])

      e.target.reset()
      setAlbumId('')
      setthumbnailUrl('')
      setTitle('')
      setUrl('')
      setError(null)
    } catch (error) {
      console.log(error)
    }

  }

  const editar = item => {
    setAlbumId(item.albumId)
    setthumbnailUrl(item.thumbnailUrl)
    setTitle(item.title)
    setUrl(item.url)
    setModoEdicion(true)
    setId(item.id)
  }
  const editarUsers = async e => {
    e.preventDefault()

    if (!albumId.trim()) {
      setError('albumId es requerido')
      return
    }
    if (!thumbnailUrl.trim()) {
      setError('thumbnailUrl es requerido')
      return
    }
    if (!title.trim()) {
      setError('title es requerido')
      return
    }
    if (!url.trim()) {
      setError('url es requerido')
      return
    }

    try {
      const db = firebase.firestore()
      await db.collection('users').doc(id).update({
        albumId: albumId,
        thumbnailUrl: thumbnailUrl,
        title: title,
        url: url,
      })
      const arrayEditado = listaUsers.map(
        item => item.id === id ? {
          id: id, albumId: albumId,
          thumbnailUrl: thumbnailUrl,
          title: title,
          url: url,
        } : item
      )

      setListaUsers(arrayEditado)
      setAlbumId('')
      setthumbnailUrl('')
      setTitle('')
      setUrl('')
      setModoEdicion(false)
      setError(null)

    } catch (error) {
      console.log(error)
    }

  }
  const eliminar = async id => {
    try {
      const db = firebase.firestore()
      await db.collection('users').doc(id).delete()
      const aux = listaUsers.filter(item => item.id !== id)
      setListaUsers(aux)
    } catch (error) {
      console.log(error)
    }


  }

  const cancelar = () => {
    setModoEdicion(false)
    setAlbumId('')
    setthumbnailUrl('')
    setTitle('')
    setUrl('')
    setId('')
    setError(null)
  }

  return (
    <>
      <h3>{listaUsers[1]?.title}</h3>
      {cargando && <p className='animate__animated animate__flash'>Cargando...</p>}

      <div className='card-grid animate__animated animate__bounceInLeft column' >
        {
          listaUsers.map((user) => (
            <UserItem
              key={user.id}
              {...user} />
          ))
        }

        <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(listaUsers.id)}>
          Eliminar
        </button>
        <button className='btn btn-warning btn-sm float-end mx-2' onClick={() => editar(listaUsers)}>
          Editar
        </button>

        <div className='col-3'>
          <h4 className='text-center'>
            {
              modoEdicion ? 'Editar Usuario' : 'Agregar Usuario'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarUsers : guardarUsers}>
            {
              error ? <span className='text-danger'>{error}</span> : null
            }
            <input
              className='form-control mb-2'
              type="text"
              placeholder='Ingrese AlbumId'
              onChange={(e) => setAlbumId(e.target.value)}
              value={albumId}
            />
            <input
              className='form-control mb-2'
              placeholder='Ingrese thumbnailUrl'
              type="text"
              onChange={(e) => setthumbnailUrl(e.target.value)}
              value={thumbnailUrl}
            />
            <input
              className='form-control mb-2'
              placeholder='Ingrese title'
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              className='form-control mb-2'
              placeholder='Ingrese url'
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />


            {
              modoEdicion ?
                (
                  <>
                    <button
                      className='btn btn-warning btn-block'
                      type='submit'
                    >Editar</button>
                    <button
                      className='btn btn-dark btn-block mx-2'
                      onClick={() => cancelar()}
                    >Cancelar</button>
                  </>
                )
                :

                <button
                  className='btn btn-primary btn-block'
                  type='submit'
                >Agregar</button>

            }

          </form>
        </div>

      </div>


    </>
  )
}

export default UserContenedor