import React from 'react'
import { AdminNavBar } from '../../components/admin/AdminNavBar'
import { AdminSideBar } from '../../components/admin/AdminSideBar'
import AdminLocationAdd from '../../components/admin/AdminLocationAdd'

function AdminAddLocation() {
  return (
    <div  className=''>
<AdminNavBar />
<AdminSideBar/>
<AdminLocationAdd/>

    </div>
  )
}

export default AdminAddLocation