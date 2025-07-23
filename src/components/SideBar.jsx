import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <div className="sidebar">
        <h2>Menu</h2>
        <ul>
            <li className="home-link" key="home-button">
              <Link to="/">
                Home
              </Link>
            </li>
            <li>About</li>
        </ul>
    </div>
  )
}

export default SideBar