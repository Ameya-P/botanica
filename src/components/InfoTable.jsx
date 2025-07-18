import React from 'react'
import { useState, useEffect } from 'react'
import TableRow from "./TableRow"

const InfoTable = ({ plants, filterOptions }) => {

  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filterType, setFilterType] = useState("None")
  const [selectedItems, setSelectedItems] = useState([]);


  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = plants.filter(
        (plant) => [plant.name, plant.scientific_name].join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )

      setFilteredResults(filteredData)
    } else {
      setFilteredResults(plants)
    }
  }

  const selectAttribute = (value) => {

    const convertedKey = value.replace(/ /g, "_"); // "Life Cycle" → "Life_cycle"

    // Map display text to actual keys
    const keyMapping = {
      Edible: "Edible",
      Life_Cycle: "Life_cycle",
      Water: "Water_requirement",
      Light: "Light_requirement",
      Soil: "Soil_type",
    };

    const key = keyMapping[convertedKey];
    if (key) {
      setFilterType(key);
    }

    console.log("Clicked value:", value);
    console.log("Converted key:", key);
    console.log("filterOptions[key]:", filterOptions[key]);
    console.log("Is it an array?", Array.isArray(filterOptions[key]));
  }

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item])
    }
  };

  return (
    <ul className="info-table">
      <li className="header">
        <div className="search-attributes">
          <span className="name search">Name</span>
          <span className="sci-name search">Scientific Name</span>
          <span className="edible search" onClick={(e) => selectAttribute(e.target.textContent)}>Edible</span>
          <span className="life-cycle search" onClick={(e) => selectAttribute(e.target.textContent)}>Life Cycle</span>
          <span className="water search" onClick={(e) => selectAttribute(e.target.textContent)}>Water</span>
          <span className="light search" onClick={(e) => selectAttribute(e.target.textContent)}>Light</span>
          <span className="soil search" onClick={(e) => selectAttribute(e.target.textContent)}>Soil</span>
        </div>
        <div className="search-inputs">
          <input
            type="text"
            placeholder='Search...'
            onChange={(inputString) => searchItems(inputString.target.value)}
          />

          {filterOptions[filterType].map(option => (
            <label key={option}>
              <input
                type="checkbox"
                checked={selectedItems.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
          <p>Selected: {selectedItems.join(', ')}</p>
        </div>
      </li>

      {searchInput.length > 0
        ?
        plants && filteredResults && filteredResults.map(
          (plant) => (
            <TableRow
              key={plant.id}
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

        :

        plants && plants.map(
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

