import React from 'react'
import { useState, useEffect } from 'react'
import TableRow from "./TableRow"

const InfoTable = ({plants, setViewPlant}) => {

  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = Object.fromEntries(
        plants.filter(
        (plant) => plant.name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(plants)
    }
  }

  return (
    <ul className="info-table">
      <li className="header">
            <span className="name search">Name</span>
            <span className="sci-name search">Scientific Name</span>
            <span className="edible search">Edible</span>
            <span className="life-cycle search">Life Cycle</span>
            <span className="water search">Water</span>
            <span className="light search">Light</span>
            <span className="soil search">Soil</span>
      </li>

      {plants.map(
          (plant) => (
            <TableRow
              id={plant.id}
              name={plant.name ?? "Unknown"}
              sci_name={plant.scientific_name ?? "Unknown"}
              image={plant.images.thumb ?? "/placeholder.png"}
              edible={plant.data?.Edible ?? "Unknown"}
              life_cycle={plant.data?.Life_cycle ?? "Unknown"}
              water={plant.data?.Water_requirement ?? "Unknown"}
              light={plant.data?.Light_requirement ?? "Unknown"}
              soil={plant.data?.Soil_type ?? "Unknown"} />
          )
        )
        }
    </ul>
  )
}

export default InfoTable

