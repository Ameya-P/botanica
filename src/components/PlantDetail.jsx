import { Component, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const ID = import.meta.env.VITE_KEY_ID
const API_KEY = import.meta.env.VITE_KEY_SECRET

const PlantDetail = ({ plants }) => {
    const { plantID } = useParams()
    const [plantData, setPlantData] = useState({})
    const [description, setDescription] = useState({})
    const URL = `/api/plants/` + plantID

    useEffect(() => {

        const fetchPlant = async () => {
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-permapeople-key-id': ID,
                    'x-permapeople-key-secret': API_KEY
                }
            });

            const plant = await response.json();

            // Clean plant data from [0: {key:"key-name", "value:"value-name"}] to {key: "value"}
            const plantData = Object.fromEntries(
                Object.entries(plant.data).map(
                    ([index, kvdict]) => ([kvdict["key"].replaceAll(' ', '_'), kvdict["value"]])
                )
            );

            // If plant data doesn't have a key, fill in that key with unknown
            plantData.Edible ||= "Unknown";
            plantData.Life_cycle ||= "Unknown";
            plantData.Water_requirement ||= "Unknown";
            plantData.Light_requirement ||= "Unknown";
            plantData.Soil_type ||= "Unknown";

            plant.data = plantData;

            setPlantData(plant);
        }




        fetchPlant().catch(console.error)
    }, []);

    return (
        <>
            {plantData && (
                <div className="plant-detail">
                    <h1>{plantData.name ?? "Unknown"}</h1>
                    <h2>{plantData.scientific_name ?? "Unknown"}</h2>
                    <img src={plantData.images?.thumb ?? "/placeholder.png"} />
                    <div className='attributes'>
                        <span className="edible item">Edible: {plantData.data?.Edible ?? "Unknown"}</span>
                        <span className="life-cycle item">Life Cycle: {plantData.data?.Life_cycle ?? "Unknown"}</span>
                        <span className="water item">Water Needs: {plantData.data?.Water_requirement ?? "Unknown"}</span>
                        <span className="light item">Light Needs: {plantData.data?.Light_requirement ?? "Unknown"}</span>
                        <span className="soil item">Soil Type: {plantData.data?.Soil_type ?? "Unknown"}</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlantDetail