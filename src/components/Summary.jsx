import React from 'react'
import { useState, useEffect } from 'react'

const Summary = ({plants}) => {
  const countEdiblePlants = (plants) => {
  return plants.filter(plant => {
    // Find the "Edible" key in the data array
    const edibleData = plant.data.find(item => item.key === 'Edible');
    // Check if the value is 'true' (it's a string, not boolean)
    return edibleData && edibleData.value === 'true';
  }).length;
};

const findMostCommonLifeCycle = (plants) => {
  // Count occurrences of each life cycle
  const lifeCycleCounts = plants.reduce((counts, plant) => {
    // Find the Life cycle data
    const lifeCycleData = plant.data.find(item => item.key === 'Life cycle');
    
    if (lifeCycleData && lifeCycleData.value) {
      const lifeCycle = lifeCycleData.value;
      counts[lifeCycle] = (counts[lifeCycle] || 0) + 1;
    }
    
    return counts;
  }, {});
  
  // Find the most common one
  let mostCommon = null;
  let maxCount = 0;
  
  Object.entries(lifeCycleCounts).forEach(([lifeCycle, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommon = lifeCycle;
    }
  });
  
  return {
    lifeCycle: mostCommon,
    count: maxCount,
    allCounts: lifeCycleCounts
  };
};

const result = findMostCommonLifeCycle(plants);

  return (
    <div className="summary">
      <div className="total">Total: {Object.entries(plants).length}</div>
      <div className="edible-total">Total Number Of Edible Plants: {countEdiblePlants(plants)}</div>
      <div className="mode">Most Common Life Cycle Type: {result.lifeCycle}</div>
    </div>
  )
}

export default Summary

{/* <img src={viewPlant.image}/>
        <div className="details">
            <span className="name">{viewPlant.name}</span>
            <span className="sci_name">{viewPlant.sci_name}</span>
            <span className="edible">edible: {viewPlant.edible}</span>
            <span className="life_cycle">life cycle: {viewPlant.life_cycle}</span>
            <span className="water">water: {viewPlant.water}</span>
            <span className="light">light: {viewPlant.light}</span>
            <span className="soil">soil: {viewPlant.soil}</span>
        </div> */}