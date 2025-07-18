import { useState, useEffect } from 'react'
import './App.css'
import SideBar from "./components/SideBar"
import Toggle from "./components/Toggle"
import InfoTable from "./components/InfoTable"
import Summary from "./components/Summary"
const ID = import.meta.env.VITE_KEY_ID
const API_KEY = import.meta.env.VITE_KEY_SECRET

function App() {
  const [plants, setPlants] = useState([])
  const [filterOptions, setFilterOptions] = useState({
    Edible: [],
    Life_cycle: [],
    Water_requirement: [],
    Light_requirement: [],
    Soil_type: [],
    None: []
  })
  const URL = `/api/plants`

  useEffect(() => {

    const fetchPlants = async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-permapeople-key-id': ID,
          'x-permapeople-key-secret': API_KEY
        }
      });

      const data = await response.json();

      // Clean plant data from [0: {key:"key-name", "value:"value-name"}] to {key: "value"}
      data.plants.map(
        (plant) => {
          const plantData = Object.fromEntries(
            Object.entries(plant.data).map(
              ([index, kvdict]) => ([kvdict["key"].replaceAll(' ', '_'), kvdict["value"]])
            )
          );

          plant.data = plantData;

          // Fill in the filter options
          const keys = ["Edible", "Life_cycle", "Water_requirement", "Light_requirement", "Soil_type"]

          for (const key of keys) {
            const values = plantData[key] ? plantData[key].split(",")
              .map(item => item.trim())
              .filter(item => item !== "") 
              : ["Unknown"];

            for (const value of values) {
              if (!filterOptions[key].includes(value)) {
                setFilterOptions({
                  ...filterOptions,           // Copy existing properties
                  [key]: filterOptions[key].push(value)      // Override specific property
                })
              }
            }
          }
        }
      )

      console.log(data.plants);
      console.log(filterOptions)
      setPlants(data.plants);
    }

    fetchPlants().catch(console.error)
  }, []);


  return (
    <div className="app-container">
      <div className="menu">
        <Toggle />
        <SideBar />
      </div>
      <div className='main-content'>
        <h1>Botanica</h1>
        <p className="tagline">Your garden of plant knowledge starts here!</p>
        <Summary plants={plants} />
        <InfoTable plants={plants} filterOptions={filterOptions}/>
      </div>
    </div>
  )
}

export default App
