import React from 'react'
import { useState, useEffect } from 'react'
const ID = import.meta.env.VITE_KEY_ID
const API_KEY = import.meta.env.VITE_KEY_SECRET

const TableRow = ({ id, name, sci_name, image, edible, life_cycle, water, light, soil, setViewPlant }) => {

    const viewSummary = () => {
        setViewPlant({
            name: name,
            sci_name: sci_name,
            image: image,
            edible: edible,
            life_cycle: life_cycle,
            water: water,
            light: light,
            soil: soil
        })
    }

    return (
        <li key={id} className="table-row">
            <span className="name item">{name}</span>
            <span className="sci_name item">{sci_name}</span>
            <span className="edible item">{edible}</span>
            <span className="life_cycle item">{life_cycle}</span>
            <span className="water item">{water}</span>
            <span className="light item">{light}</span>
            <span className="soil item">{soil}</span>
            <button onClick={viewSummary}>View Details</button>
        </li>
    )
}

export default TableRow