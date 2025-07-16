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
      <li>
        <input
        type="text"
        placeholder='Search...'
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      </li>
      <li className="header">
            <span className="name item">Name</span>
            <span className="sci_name item">Scientific Name</span>
            <span className="edible item">Edible</span>
            <span className="life_cycle item">Life Cycle</span>
            <span className="water item">Water</span>
            <span className="light item">Light</span>
            <span className="soil item">Soil</span>
            <span className="spacer item"></span>
      </li>

      {plants.map(
          (plant) => {
            const plantData = Object.fromEntries(
              Object.entries(plant.data).map(
                ([index, kvdict]) => ([kvdict["key"].replaceAll(' ', '_'), kvdict["value"]])
              )
            );

            return <TableRow
              id={plant.id}
              name={plant.name}
              sci_name={plant.scientific_name}
              image={plant.images.thumb}
              edible={plantData?.Edible}
              life_cycle={plantData?.Life_cycle}
              water={plantData?.Water_requirement}
              light={plantData?.Light_requirement}
              soil={plantData?.Soil_type}
              setViewPlant={setViewPlant} />;
          }
        )
        }
    </ul>
  )
}

export default InfoTable

