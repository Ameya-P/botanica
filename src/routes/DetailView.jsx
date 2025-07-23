import PlantDetail from "../components/PlantDetail"

const DetailView = ({ plants }) => {
  return (
    <div>
      <PlantDetail plants={plants}/>
    </div>
  )
}

export default DetailView