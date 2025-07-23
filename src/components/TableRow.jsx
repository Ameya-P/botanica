import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
const ID = import.meta.env.VITE_KEY_ID
const API_KEY = import.meta.env.VITE_KEY_SECRET

const TableRow = ({ id, name, sci_name, image, edible, life_cycle, water, light, soil }) => {

    return (
        <li key={id} className="table-row">
            <img src={image}/>
            <div className="row-content">
                <h3 className="name">{name}</h3>
                <span className="sci-name">{sci_name}</span>
                
                <div className='attributes'>
                    <span className="edible item">Edible: {edible}</span>
                    <span className="life-cycle item">Life Cycle: {life_cycle}</span>
                    <span className="water item">Water Needs: {water}</span>
                    <span className="light item">Light Needs: {light}</span>
                    <span className="soil item">Soil Type: {soil}</span>
                </div>

                <Link to={`/plantDetails/${id}`}>
                    <button>Learn More!</button>
                </Link>
            </div>
        </li>
    )
}

export default TableRow