import React from 'react'
import { useState, useEffect } from 'react'

const SideBar = () => {
  return (
    <div className="sidebar">
        <h2>Menu</h2>
        <ul>
            <li>Dashboard</li>
            <li>Search</li>
            <li>About</li>
        </ul>
    </div>
  )
}

export default SideBar