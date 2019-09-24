import React from 'react'
import {Link} from 'react-router-dom'

const AdminHome = () => {
  return (
    <div>
      <Link to="/admin/orders">
        <button type="button">Manage Orders</button>
      </Link>
      <Link to="/admin/add-book">
        <button type="button">Add New Book</button>
      </Link>
    </div>
  )
}

export default AdminHome
