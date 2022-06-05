import React from 'react'

const UserItem = ({title, url}) => {
  return (
    <div className='card animate__animated animate__fadeIn'>
        <img src={url} alt = {title}/>
    </div>
  )
}

export default UserItem