import React from 'react'
import { useState, useEffect } from 'react'
import TableRow from "./TableRow"

const InfoTable = ({ plants, filterOptions, filteredResults, setFilteredResults }) => {
  
  const [searchInput, setSearchInput] = useState("")
  const [filterType, setFilterType] = useState("None")
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    let results = plants || [];

    // Apply search filter
    if (searchInput !== "") {
      results = results.filter(
        (plant) => [plant.name, plant.scientific_name].join(" ")
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    }

    // Apply attribute filter
    console.log(filterType)
    console.log(selectedItems)

    console.log("Results before filter:", results.length);

    if (filterType !== "None" && selectedItems.length > 0) {
      results = results.filter((plant) => {
        const plantValue = plant.data[filterType]?.toString() || "";

        const match = selectedItems.every(item => {
          const includes = plantValue.toLowerCase().includes(item.toLowerCase().trim());
          return includes; // You need to return the boolean!
        });

        return match;
      });

      console.log("Results after filter:", results.length);
    }

    setFilteredResults(results);
  }, [plants, searchInput, filterType, selectedItems])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
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
      setSelectedItems([]);
    }
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
          className="find"
            type="text"
            placeholder='Search...'
            onChange={(inputString) => searchItems(inputString.target.value)}
          />

          {filterOptions[filterType].map(option => (
            <label key={option} className="check-container">
              {option}
              <input
                type="checkbox"
                checked={selectedItems.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <span className="checkmark"></span>
            </label>
          ))}
          <p> <strong>Selected:</strong> {selectedItems.join(', ')}</p>
        </div>
      </li>

      {filteredResults.length > 0
        ?
        plants && filteredResults && filteredResults.map(
          (plant) => (
            <TableRow
              key={plant.id}
              name={plant?.name ?? "Unknown"}
              sci_name={plant?.scientific_name ?? "Unknown"}
              image={plant?.images?.thumb ?? "/placeholder.png"}
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
      }
    </ul>
  )
}

export default InfoTable

