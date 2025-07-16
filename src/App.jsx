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
  const [viewPlant, setViewPlant] = useState({
    name: "",
    sci_name: "",
    image: "/vite.svg",
    edible: "",
    life_cycle: "",
    water: "",
    light: "",
    soil: ""
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

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Content-Type:', response.headers.get('content-type'));

    console.log('Key ID:', import.meta.env.VITE_KEY_ID);
    console.log('Key Secret:', import.meta.env.VITE_KEY_SECRET);

      const data = await response.json();
      console.log(data)
      setPlants(data.plants);
    }

    fetchPlants().catch(console.error)
  }, []);


  return (
    <div className="app-container">
      <div className="menu">
        <Toggle/>
        <SideBar/>
      </div>
      <div className='main-content'>
        <h1>Botanica</h1>
        <p>Your garden of plant knowledge starts here!</p>
        <Summary plants={plants}/>
        <InfoTable plants={plants} setViewPlant={setViewPlant}/>
      </div>
    </div>
  )
}

export default App
