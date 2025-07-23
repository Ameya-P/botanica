import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import Layout from './routes/Layout'
import DetailView from './routes/DetailView'
import './index.css'
import App from './App.jsx'

function AppWrapper() {
  const [plants, setPlants] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App plants={plants} setPlants={setPlants}/>} />
          <Route path="/plantDetails/:plantID" element={<DetailView plants={plants}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
