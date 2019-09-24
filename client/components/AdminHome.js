import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const AdminHome = () => {
  return (
    <div className="admin-home">
      <div className="admin-header">
        <h3>Admin Dashboard</h3>
      </div>
      <div className="admin-buttons">
        <Link to="/admin/orders">
          <Button type="button" variant="danger">
            Manage Orders
          </Button>
        </Link>
        <Link to="/admin/add-book">
          <Button type="button" variant="danger">
            Add New Book
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AdminHome
